@echo off
git pull
::随机生成12-（12+18-1）的随机数count%%(end-1)+start
set count=%random%
set /a count=count%%18+12
echo total:%count%
for /l %%i in (1, 1, %count%) do (
	echo var a = [%%i] > index.js
	git add .
	git commit -m 'Greate'
	git push
	echo index:%%i
)
echo *----------------SUCCESS--------------------*
echo *                                           *
echo *             a commit a day                *
echo *        keeps your girlfriend away         *
echo *                                           *
echo *        _ _ _          _   _     _         * 
echo *       | (_) | _____  | |_| |__ (_)___     * 
echo *       | | | |/ / _ \ | __| '_ \| / __|    * 
echo *       | | |   <  __/ | |_| | | | \__ \    * 
echo *       |_|_|_|\_\___|  \__|_| |_|_|___/    * 	
echo *                                           *
echo *                                           *				
echo *-----------------SUCCESS-------------------*
timeout /nobreak /t 10