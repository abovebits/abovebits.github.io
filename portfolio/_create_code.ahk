folder := A_ScriptDir
extensions := "jpg,png,gif,jpeg"
SetWorkingDir %A_ScriptDir%
loop, %folder%\*
{
if A_LoopFileExt in %extensions% 
{
FileAppend,
(
<li class="grid__item">
    <a class="grid__link" href="portfolio/%A_LoopFileName%" data-lightbox="portfolio">
        <img class="grid__img layer" src="img/canvas.png" alt="" />
        <img class="grid__img layer" src="img/wireframe.png" alt="" />
        <img class="grid__img layer" src="portfolio/%A_LoopFileName%" alt="%A_LoopFileName%" />
        <span class="grid__title">%A_LoopFileName%</span>
    </a>
</li>
), _images.txt
}
}