<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Example of jQuery Multiple Properties Animation</title>
<script src="https://code.jquery.com/jquery-3.5.0.js"></script>
<style>
    .box{
        width: 100px;
        height: 100px;
        background: #9d7ede;
        margin-top: 30px;
        border-style: solid; /* Required to animate border width */
        border-color: #6f40ce;
    }
</style>
<script>
$(document).ready(function(){
    $("button").click(function(){
        $(".box").animate({
            width: "300px",
        },3000);
    });
});
</script>
</head>
<body>
    <button type="button">Start Animation</button>
    <div class="box"></div>
</body>
</html>  