from django.shortcuts import render

def home(request):
    return render(request, "sin_base.html")
