from django.views.decorators.csrf import csrf_exempt
from asgiref.sync import sync_to_async
from django.http import JsonResponse
import time
import requests


def call_API(external_url: str, data: dict):
    start = time.perf_counter()  

    headers = {
        "Content-Type": "text/html; charset=UTF-8",
        "Accept-Encoding": "gzip, deflate, br"  # Cho phép nhận dữ liệu nén
    }

    external_response = requests.post(external_url, data, headers=headers, verify=False, timeout=7)
    external_response.raise_for_status()  # Kiểm tra lỗi HTTP
    try:
        dataAPI = external_response.json()

        end = time.perf_counter()
        print(f"Thời gian chạy: {end - start:.6f} giây")

        return dataAPI
    except ValueError:
        return JsonResponse({'error': 'Invalid JSON response'}, status=500)


@csrf_exempt
@sync_to_async
def trave_dulieu_datagrid_test(request, external_url: str):
    if request.method != 'POST':
        return JsonResponse({'error': 'Invalid request method'}, status=400)
    try:
        page = int(request.POST.get('page', 1))
        rows = int(request.POST.get('rows', 20))

        manhomsp = request.POST.get('manhomsp', '')
        makhotimsp = request.POST.get('makhotimsp', '') # mã kho

        timkiemtksp = request.POST.get('timkiemtksp', '')
        makhotksp = request.POST.get('makhotksp', '') # mã kho

        HH = request.POST.get('HH', 'None')

        data = {
            'page': page, 
            'rows': rows
        }

        # lọc nhãn hàng
        if manhomsp != '':
            data['manhomsp'] = manhomsp
        if makhotimsp != '':
            data['makhotimsp'] = makhotimsp

        # lọc sản phẩm
        if timkiemtksp != '':
            data['timkiemtksp'] = timkiemtksp
        if makhotksp != '':
            data['makhotksp'] = makhotksp

        # DS sản phẩm hết hàng
        if HH != 'None':
            data['HH'] = HH

        # call api
        dataApi = call_API(external_url, data)

        return JsonResponse(dataApi, safe=False)
    except requests.RequestException as e:
        print(f"Request to external server failed: {e}")
        return JsonResponse({'error': str(e)}, status=500)


@csrf_exempt
@sync_to_async
def trave_dulieu_datagrid(request, external_url: str):
    if request.method != 'POST':
        return JsonResponse({'error': 'Invalid request method'}, status=400)
    try:

        start = time.perf_counter()  

        page = int(request.POST.get('page',1))
        rows = int(request.POST.get('rows',20))

        headers = {
            "Content-Type": "text/html; charset=UTF-8",
            "Accept-Encoding": "gzip, deflate, br"  # Cho phép nhận dữ liệu nén
        }

        external_response = requests.post(external_url, data={'page':page, 'rows':rows}, headers=headers, verify=False, timeout=7)
        external_response.raise_for_status()  # Kiểm tra lỗi HTTP

        try:
            data = external_response.json()
        except ValueError:
            return JsonResponse({'error': 'Invalid JSON response'}, status=500)
        
        end = time.perf_counter()
        print(f"Thời gian chạy: {end - start:.6f} giây")

        return JsonResponse(data, safe=False)
    except requests.RequestException as e:
        print(f"Request to external server failed: {e}")
        return JsonResponse({'error': str(e)}, status=500)
