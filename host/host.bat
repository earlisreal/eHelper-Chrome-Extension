@echo off

set LOG=C:\Users\esavader.ORADEV\Desktop\log.txt

time /t >> %LOG%

"%~dp0node.exe" "%~dp0host.js" %* 2>> %LOG%

echo %errorlevel% >> %LOG%
