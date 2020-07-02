
<%-- 
    Document   : provisionalBill
    Created on : 5 Apr, 2019, 6:52:51 PM
    Author     : vivek
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Tax-Invoice</title>
    <style>
        
        * {
            font-family: Arial, Helvetica, sans-serif;
        }

        pre {
            margin: 0;
        }

        .invoice {
            width: 840px;
            margin: 0 auto;

        }

        .header {
            margin-bottom: 65px;
        }

        .header .logo img {
            width: 250px;
        }

       
        .header .address {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 17px;
            line-height: 1.4;
            margin-top: 55px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        table td,
        table td {
            vertical-align: top;
            font-size: 14px;
            padding: 3px;
            border: 1px solid #333333;
        }

        .table-inside td,
        .table-inside td {
            border-width: 0;
            border-color: #000000;
        }

        .table-inside table {
            border-collapse: collapse;
        }

        [line-h-1d4] {
            line-height: 1.4;
        }

        [text-right] {
            text-align: right;
        }

        [text-left] {
            text-align: left;
        }

        [text-center] {
            text-align: center;
        }

        [bold] {
            font-weight: bold;
        }

        [uppercase] {
            text-transform: uppercase;
        }

        [n-b] {
            border-width: 0 !important;
        }

        [n-b-t] {
            border-top-width: 0 !important;
        }

        [n-b-r] {
            border-right-width: 0 !important;
        }

        [n-b-b] {
            border-bottom-width: 0 !important;
        }

        [n-b-l] {
            border-left-width: 0 !important;
        }

        [n-b-l-r] {
            border-left-width: 0 !important;
            border-right-width: 0 !important;
        }

        [n-b-t-b] {
            border-top-width: 0 !important;
            border-bottom-width: 0 !important;
        }

        [b-t] {
            border-top-width: 1px !important;
        }

        [b-b] {
            border-bottom-width: 1px !important;
        }

        [b-l] {
            border-left-width: 1px !important;
        }

        [b-r] {
            border-right-width: 1px !important;
        }

        [b-l-r] {
            border-width: 0 1px !important;
        }

        [b-r-b-l] {
            border-width: 0 1px 1px 1px !important;
        }

        [b-all] {
            border-width: 1px 1px 1px 1px !important;
        }

        [v-t] {
            vertical-align: top;
        }

        [v-b] {
            vertical-align: bottom;
        }

        [v-m] {
            vertical-align: middle;
        }

        [check-box] {
            position: relative;
            padding-left: 35px;
        }

        [check-box]:after {
            content: "";
            width: 14px;
            height: 14px;
            border: 1px solid #000000;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 10px;
        }

        [p-t-35] {
            padding-top: 35px;
        }

        [p-t-b-25] {
            padding: 25px 0;
        }

        [overline]{
            text-decoration: overline;
        }
        [underline]{
            text-decoration: underline;
        }

        .collar-slip {
            display: flex;
            justify-content: space-between;
        }

        .head-detail{
            display: flex;
        }
.print {

position: 
fixed;

top: 
10px;

right: 
10px;

padding: 
10px;

background: 
#c1c1c1;

border: 
0;

outline: 
none;

width: 
100px;

cursor: 
pointer;

}

       
    </style>
</head>

<body onload="initial()">
 <button
class="print"
onclick="printWindow()">Print</button> 

    <main>
        <div class="invoice">
            <table class="header">
                <tr>
                    <td colspan="6" n-b b-b b-l b-t>

                        <div class="head-detail">
                            <div class="logo"><img src="assets/img/billlogo.jpg" /></div>
                                <!-- <div class="address">
                                        2nd Floor, Karkhanis Snehal Hospital, Naupada, Gokhale Road, Thane West, Thane, Maharashtra 400602
                                </div> -->
                        </div>
                        
                    </td>
                    <td>
                        <table style="margin-top: 45px;">
                            <tr>
                                <td  n-b bold style="width: 77px; font-size: 16px;">Name :</td>
                                <td  n-b style="width: 205px;font-size: 16px;" id='name'></td>
                                <td  n-b bold style="width: 173px;font-size: 16px;"> Bill No. :</td>
                                <td  n-b style="width: 155px;font-size: 16px;" id="billNo"></td>
                            </tr>
                            <tr>
                                <td bold n-b style="font-size: 16px;">Branch :</td>
                                <td n-b style="font-size: 16px;" id="branch"></td>
                                <td n-b style="font-size: 16px;" bold>Bill Date : </td>
                                <td n-b istyle="font-size: 16px;" id="billDate"></td>
                
                            </tr>

                            <tr>
                                <td bold n-b style="font-size: 16px;">Sex :</td>
                                <td n-b id="sex" style="font-size: 16px;"></td>
                                <td n-b bold style="font-size: 16px;">Payment Method :</td>
                                <td n-b id="paymentMethod" style="font-size: 16px;"></td>
                            </tr>
                            
                            <tr>
                                <td bold n-b style="font-size: 16px;">CFC :</td>
                                <td n-b id="cfc" style="font-size: 16px;"></td>
                                <td n-b bold style="font-size: 16px;">Doctor :</td>
                                <td n-b id="doctor" style="font-size: 16px;"></td>
                            </tr>
                            
                        </table>
                    </td>
                </tr>

               
            </table>


            <table>
                <tr>
                    <td n-b-b text-center bold style="font-size: 22px;">Provisional Bill</td>
                </tr>
            </table>


            <table id="billTable">
                <tr>
                    <td bold style="width: 80px;">Sr No.</td>
                    <td bold style="width: 400px;">Particulars</td>
                    
                    <td bold style="width: 250px;" text-right>Amount</td>
                   
                </tr>
            </table>

            


            <table>
                    <tr>
                            <td n-b-r n-b-t n-b-b bold text-right style="width: 450px;"></td>
                            <td n-b-r n-b-t n-b-l bold text-left >Bill Amount</td>
                            <td n-b-l n-b-t bold text-right style="width: 250px;" id="billAmount"></td>
                    </tr>
                    
                    <tr>
                            <td n-b-r n-b-t n-b-b text-right bold style="width: 450px;" ></td>
                            <td n-b-r n-b-t n-b-l text-left bold >Advance Adj Bill</td>
                            <td n-b-l n-b-t bold text-right style="width: 250px;" id="adjustBill"></td>
                    </tr>
                    <tr>
                        <td n-b-r n-b-t n-b-b bold text-right style="width: 450px;"> </td>
                        <td n-b-l n-b-t n-b-r n-b-l bold text-left > Balance Payable</td>
                        <td n-b-l n-b-t text-right bold id="balanceAmount"> 0</td>
                    </tr>
                    <tr>
                        <td n-b-r n-b-t n-b-b bold></td>
                        <td n-b bold></td>
                        <td n-b-l n-b-t n-b-b bold p-t-b-25 text-right >For, Cocoon Fertility </td>
    
                    </tr>
                    <tr>
                        <td n-b-t n-b-r n-b-b bold height= "100px"></td>
                        <td n-b bold height= "100px"></td>
                        <td n-b-t n-b-b n-b-l bold height= "100px"></td>
                    </tr>
                    <tr>
                        <td n-b-r n-b-t  bold></td>
                        <td n-b-r n-b-t n-b-l bold></td>
                        <td n-b-l n-b-t bold text-right > <span overline>Sign & Stamp</span> 
                        </td>
                    </tr>
                </table>

        </div>
    </main>
    <script src="assets/scripts/provisionalBill.js" type="text/javascript"></script>
    <script src="assets/js/global/jquery.min.js" type="text/javascript"></script>
</body>








</html>