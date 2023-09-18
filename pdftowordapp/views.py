from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from pdf2docx import Converter
from django.core.files.uploadedfile import TemporaryUploadedFile
from django.http import HttpResponse
import uuid  # Import the UUID module
import os
from django.http import FileResponse


# Create your views here.
def homePageView(request):
    return render(request,'pdftowordapp/homepage.html')


@api_view(['POST'])
def processPdfToWord(request):
    pdf_file = request.FILES['file']
    fileId = request.META.get('REMOTE_ADDR', '') + '_' + str(uuid.uuid4()) + '_' + pdf_file.name
    filePath = 'pdftowordapp/temppdffiles/' + fileId
    with open(filePath , 'wb') as destination:
        for chunk in pdf_file.chunks():
            destination.write(chunk)

    cv = Converter(filePath)
    docxFilePath = filePath.replace('.pdf','.docx')
    cv.convert(docxFilePath, start=0, end=None)
    cv.close()
    docXFileName = pdf_file.name.replace('.pdf','.docx')
    docx_file = open(docxFilePath, 'rb')
    response = FileResponse(docx_file, content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    response['Content-Disposition'] = f'attachment; filename="{docXFileName}"'
    os.remove(filePath)  # Delete the PDF file
    os.remove(docxFilePath)
    # delete both pdf and docx temp files
    return response
