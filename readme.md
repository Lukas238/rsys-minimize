# rsys-minimize

CLI node app that let you minimize an HTML file, keep special comments, and keep [Responsys] functions intact.

## Options

**Usage**: rsys_minimize <filename>

## Install

```
npm install rsys_minimize -g
```

>**Note**: You must install this package globally to be able to use it anywhere from the CLI.

## How to use

```
rsys_minimize C:\work\filename.htm
```

The resulted minimized file will be created and saved in the same folder with ```.min``` added to the name, like ```
filename.min.htm```.


### Use it from inside [VSCode] as a task

Configure a custom task in [VSCode] to minimize the current opened file.

Here is an example task file that add the tasks **rsys_minimize**.
```js
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "tasks": [
        {
            "taskName": "rsys_minimize",
            "type": "shell",
            "command": "rsys_minimize ${file}",
            "presentation": {
                "reveal": "never"
            }
        }
    ]
}
```

## About HTML comments

### Plain comments
Plain HTML comments will get removed.
```html
<!-- REMOVE THIS -->
```

### _Special_ comments

_Special_ comments starting with double asterisk will not be removed.
```html
<!--** KEEP THIS -->
```

### IE Conditional comments
IE conditional comments will not be removed.

```html
<!--[if IE 6]>KEEP THIS TOO<![endif]-->
<!--[if !IE]> -->ALSO KEEP THIS<!-- <![endif]-->
```

## About Responsys functions inside comments

Any RSYS function found inside an HTML comment will be extracted and preserverd in the code.

From this...
```html
<!-- This is an example of a test string
$setglobalvars(my_var, "test string")$
-->
```

To this...
```html
$setglobalvars(my_var, "test string")$
```



[VSCode]: https://code.visualstudio.com/
[Responsys]: https://www.oracle.com/marketingcloud/products/cross-channel-orchestration/