$content = Get-Content 'd:\translate_website\src\style.css'
$content[0..2787] | Set-Content 'd:\translate_website\src\style.css' -Encoding UTF8
