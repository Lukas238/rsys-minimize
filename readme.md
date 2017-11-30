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
```
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

[VSCode]: https://code.visualstudio.com/
[Responsys]: https://www.oracle.com/marketingcloud/products/cross-channel-orchestration/