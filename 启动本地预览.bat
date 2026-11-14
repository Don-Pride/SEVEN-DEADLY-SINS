@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"

rem ============================================================
rem  七宗罪 · 本地预览启动器
rem  纯静态站点，不需要 server.js，这里只起一个静态文件服务。
rem  用法：双击本文件。关闭窗口 或 按 Ctrl+C 即停止服务。
rem ============================================================

rem ---- 从 8080 起找一个没被占用的端口 ----
set PORT=8080
:findport
netstat -ano | findstr /c:":!PORT! " | findstr /i "LISTENING" >nul
if not errorlevel 1 (
  set /a PORT+=1
  if !PORT! leq 8100 goto findport
)

rem ---- 找 Python ----
set "PYEXE="
where python >nul 2>nul && set "PYEXE=python"
if not defined PYEXE (
  where py >nul 2>nul && set "PYEXE=py -3"
)

if not defined PYEXE (
  echo.
  echo  [提示] 没有找到 Python。两种办法：
  echo    1^) 直接双击本目录的 index.html，本站无后端，能正常浏览
  echo    2^) 安装 Python 后再双击本文件
  echo.
  pause
  exit /b 1
)

if /i "%~1"=="--check" (
  echo PORT=!PORT! PY=!PYEXE!
  exit /b 0
)

echo.
echo   目录：%cd%
echo   地址：http://127.0.0.1:!PORT!/
echo   停止：关掉这个窗口，或按 Ctrl+C
echo.

if /i "%~1"=="--no-browser" goto serve
start "" "http://127.0.0.1:!PORT!/"

:serve
!PYEXE! -m http.server !PORT! --bind 127.0.0.1
echo.
echo   服务已停止。
pause
