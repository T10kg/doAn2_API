from django.db import models
from django.db import models
from django.db import connection
from datetime import datetime

def kiemnvphutrach(manv,makh):
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT count(1) dem from nvphutrachkhs WHERE nvphutrachkhs.manv =%s and nvphutrachkhs.makh=%s",
            [manv, makh]
        )

        rows = cursor.fetchall()
        print(rows[0][0])
        if rows[0][0] > 0:
            return False
        else:
            return True
def themnvptmodel(manv,makh):
    if kiemnvphutrach(manv,makh):
        with connection.cursor() as cursor:
            cursor.execute(
                "INSERT INTO `nvphutrachkhs`(`id`, `manv`, `makh`, `ngayphutrach`) values('',%s,%s,Now())",
                [manv,makh]
            )
            cursor.execute(
                "SELECT * FROM `nvphutrachkhs` WHERE manv=%s and makh=%s",
                [manv,makh]
            )
            if cursor.rowcount > 0:
                return True
            else:
                return False
    return False

def xoanvptmodel(manvpt):
    with connection.cursor() as cursor:
        cursor.execute(
            "DELETE FROM nvphutrachkhs where id=%s",
            [manvpt]
        )
        if cursor.rowcount > 0:
            return True
        else:
            return False
# Create your models here.

