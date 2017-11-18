xcopy "assets" "build/assets" /v /q /f /s /y
set /p Build=<version.txt

call dev-compress.bat

xcopy "index_live.html" "build/index.html" /y
xcopy "fbapp-config.json" "build/fbapp-config.json" /y

cd build
cd assets

forfiles /s /m *.json /c "cmd /c for %%I in (@file) do minify -o %%~I %%~I"
forfiles /s /m *.png /c "cmd /c for %%I in (@file) do pngquant --quality=80-95 %%~I --ext .png -f"
cd ..

jar -cMf ../MineSweeper.v%Build%.zip *
cd ..
