from django.urls import path
from .views import *

urlpatterns = [
    path('',homePageView),
    path('process',processPdfToWord),
]