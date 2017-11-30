#!/usr/bin/env node

var fs = require('fs'),
  path = require('path');

const NEWLINE = "@@";

function minimize(input_code) {

	// Compress HTML in single line
	input_code = input_code.replace(/\r|\n/g, NEWLINE + " ");

	// Removes tab character
	input_code = input_code.replace(/\t/g, "");

	//Removes CSS comments (from CSS and HTML comments). Ex.: /* This is a CSS comment */
	input_code = input_code.replace(/\/\*[^*]*\*\//g, "");

	/*
	 * Remove plain HTML comments but keep:
	 * - Special comments with a leading **. Ex.: <!--** KEEP THIS -->
	 * - IE onditional comments
	 * - Any RSYS function inside a comment (will be extracted)
	 *
	 * Test cases: https://regex101.com/r/ZdncIk/1
	 */

	//Find and loop HTML comments (but exclude special comments and IE conditional commetns). 
	input_code = input_code.replace(/<!--(?!\s*(?:\[if [^\]]+]|<!|>|\*\*))(?:(?!-->).)*-->/g, function (match) {

		var lines_clean = '';

		var re = /\$[^\s$]+[^\$]+\$/g;
		var m = '';
		while (m = re.exec(match)) {
			lines_clean += m.join('');
		}

		m = "";
		while (m = /<!-- -->/g.exec(match)) {
			lines_clean += m.join('');
		}

		return lines_clean;

	});

	//Remove title comments. Ex.: "/* STYLES **************************/"
	input_code = input_code.replace(/\/\*[^*]+\*{2,}\//g, "");

	//Restore New Lines
	re = new RegExp(NEWLINE, 'g');
	input_code = input_code.replace(re, "");

	// Remove white spaces between any table family tags
	input_code = input_code.replace(/((html|body|head|meta|style|table|tr|td)[^>]*>)[\s]*/gi, "$1"); //After
	input_code = input_code.replace(/[\s]*(<\/(html|body|head|meta|style|table|tr|td)>)/gi, "$1"); // Before

	// Removes empty alt attributes from img tag
	input_code = input_code.replace(/(<img[^>]*)alt=?=\"\"|''([^>]*>)/gi, "$1$2");

	//Removes spaces between attributes in the tags
	input_code = input_code.replace(/<[^img](.*?)>/gi, function (match) {
		return match.replace(/([a-z]*="[^"]*")\s{2,}/gmi, '$1 ');
	});

	// Remove multiple consecutive  white spaces
	input_code = input_code.replace(/[\s]{2,}/g, " ");

	return input_code;
}

// Read file
function readFile(filename) {
	
	var fileContents;
	try {
		fileContents = fs.readFileSync(filename, 'utf8');
	} catch (err) {
		console.log('File not found.');
		return false;
	}

	return fileContents;
}

// Write file
function writeFile(filename, data) {
	var file= path.parse(filename);
	filename = file.dir + path.sep + file.name +'.min' + file.ext; //Same path. Add .min to the filename. Ex.: file.min.htm
	
	fs.writeFile(filename, data, function (err) {
		if (err) {
			return console.log(err);
		}
		console.log("The file was saved!\n\n" + filename);
	});
}

/*
 * SCRIPT
 ****************************/

// Get filename from the command line arguments
if (process.argv.length <= 2) {
	console.log("Usage: rsys_minimize <filename>");
	process.exit(-1);
}

var full_filename = path.resolve( process.argv[2] ); //Save the filename

var contents = readFile(full_filename); //Read file
if( contents ){
	contents = minimize(contents);//Minimize file
	writeFile(full_filename, contents); //Write file
}