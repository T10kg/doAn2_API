from django import forms

class sanpham(forms.Form):
    masp = forms.CharField(required=True, max_length=100)
    tensp = forms.CharField(required=True, max_length=100)
    loaisp = forms.CharField(max_length=100)
    gianhap = forms.FloatField(required=True)
    giaban = forms.FloatField(required=True)
    chietkhau = forms.FloatField()
    xuatxu = forms.CharField(max_length=100)
    mota = forms.CharField(max_length=100)
    nsx = forms.CharField(max_length=100)
    nhanhang = forms.CharField(max_length=100)
    donvi = forms.CharField(max_length=100)
    fileimg = forms.FileField(allow_empty_file=True)