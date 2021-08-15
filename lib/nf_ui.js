#target photoshop

app.nf.showErrorMessage = function(msg)
{
    alert(msg, 'Error')
}

app.nf.successMessage = function(msg)
{
    alert(msg, 'Success')
}

app.nf.yesNoMessage = function(msg, yes, no)
{
    return Window.confirm(msg);
}