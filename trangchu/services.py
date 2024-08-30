from django.views.decorators.csrf import csrf_exempt
from asgiref.sync import sync_to_async
from django.http import JsonResponse
import time
import requests

@csrf_exempt
@sync_to_async
def API(request, external_url: str, data: dict):
    try:

        start = time.perf_counter()  

        external_response = requests.post(external_url, data, verify=False)
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



