<%-- 
    Document   : home
    Created on : 13 Nov, 2018, 3:37:59 PM
    Author     : vivek
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Cocoon ERP</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <!-- BEGIN GLOBAL MANDATORY STYLES -->
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css" />
    <link href="assets/css/global/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/global/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/global/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/global/uniform.default.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/global/bootstrap-switch.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/global/select2.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/global/select2-bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/global/components-md.min.css" rel="stylesheet" id="style_components" type="text/css" />
    <link href="assets/css/global/plugins-md.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/global/datatables.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/global/datatables.bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/global/daterangepicker.min.css" rel="stylesheet" type="text/css" />
    <!--<link href=assets/bootstrap-datepicker/css/bootstrap-datepicker3.min.css" rel="stylesheet" type="text/css" />-->
    <!--<link href="assets/bootstrap-timepicker/css/bootstrap-timepicker.min.css" rel="stylesheet" type="text/css" />-->
    <link href="assets/css/global/bootstrap-datetimepicker.min.css" rel="stylesheet" type="text/css" />
    <!-- END THEME GLOBAL STYLES -->
    <!-- BEGIN THEME LAYOUT STYLES -->
    <link href="assets/css/layout/layout.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/layout/default.min.css" rel="stylesheet" type="text/css" id="style_color" />
    <link rel="stylesheet" href="assets/css/layout/main.css" />
    <!-- END THEME LAYOUT STYLES -->

    <!-- <link rel="stylesheet" type="text/css" media="screen" href="css/main.css" />
        <script src="js/main.js"></script> -->

    <% 
    response.setHeader("Cache-Control","no-cache"); 
  response.setHeader("Cache-Control","no-store"); 
  response.setHeader("Pragma","no-cache"); 
  response.setDateHeader ("Expires", 0); 	
	if (session != null) { 	
		if (session.getAttribute("userType") == null) { 
		response.sendRedirect("login.jsp"); 		
                        return;	 		
                }
                
                int userId=(int)session.getAttribute("userType");
                if(userId>1){
                  response.sendRedirect("login.jsp"); 		
                        return;  
                }
        }else{
             	response.sendRedirect("login.jsp"); 		
                        return;	
        } 
%>
</head>

<div id="loading" class="mid_center">
    <div class="loading-wrap">
        <img src="assets/img/loading.gif" />
    </div>
</div>

<body class="page-sidebar-closed-hide-logo page-container-bg-solid page-md page-header-fixed page-sidebar-fixed page-footer-fixed"
    onload="initial()">
    <!-- BEGIN HEADER -->
    <div class="page-header navbar navbar-fixed-top">
        <!-- BEGIN HEADEsR TOP -->
        <div class="page-header-inner">
            <div class="header-wrap">
                <!-- BEGIN LOGO -->
                <div class="page-logo">
                    <a href=""><img src="assets/img/logo.png " alt="logo" class="logo-default"></a>
                    <div class="menu-toggler sidebar-toggler"> </div>
                </div>
                <!-- END LOGO -->
                <!-- BEGIN RESPONSIVE MENU TOGGLER -->
                <a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse">
                </a>
            </div>
            <!-- END RESPONSIVE MENU TOGGLER -->
            <div class="top-menu">
                <ul class="nav navbar-nav pull-right">
                    <li class="dropdown dropdown-quick-sidebar-toggler" title="Logout">
                        <a href="stLogin" class="dropdown-toggle">
                            <i class="icon-logout"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <!-- END HEADER TOP -->
    </div>
    <!-- END HEADER -->
    <!-- BEGIN HEADER & CONTENT DIVIDER -->
    <div class="clearfix"> </div>
    <!-- END HEADER & CONTENT DIVIDER -->
    <!-- BEGIN CONTAINER -->
    <div class="page-container">
        <!-- BEGIN SIDEBAR -->
        <div class="page-sidebar-wrapper">
            <!-- BEGIN SIDEBAR -->
            <div class="page-sidebar navbar-collapse collapse">
                <!-- BEGIN SIDEBAR MENU -->
                <ul class="page-sidebar-menu  page-header-fixed " data-keep-expanded="false" data-auto-scroll="true"
                    data-slide-speed="200" style="padding-top: 20px">
                    <li class="sidebar-toggler-wrapper hide">
                        <!-- BEGIN SIDEBAR TOGGLER BUTTON -->
                        <div class="sidebar-toggler"> </div>
                        <!-- END SIDEBAR TOGGLER BUTTON -->
                    </li>
                    <!-- <li class="nav-item start active open">
                        <a href="javascript:;" class="nav-link nav-toggle">
                            <i class="icon-home"></i>
                            <span class="title">Dashboard</span>
                            <span class="selected"></span>
                            <span class="arrow open"></span>
                        </a>
                        <ul class="sub-menu">
                            <li class="nav-item start active open">
                                <a href="" class="nav-link ">
                                    <i class="icon-bar-chart"></i>
                                    <span class="title">Dashboard 1</span>
                                    <span class="selected"></span>
                                </a>
                            </li>
                            <li class="nav-item start ">
                                <a href="dashboard_2.html" class="nav-link ">
                                    <i class="icon-bulb"></i>
                                    <span class="title">Dashboard 2</span>
                                    <span class="badge badge-success">1</span>
                                </a>
                            </li>
                            <li class="nav-item start ">
                                <a href="dashboard_3.html" class="nav-link ">
                                    <i class="icon-graph"></i>
                                    <span class="title">Dashboard 3</span>
                                    <span class="badge badge-danger">5</span>
                                </a>
                            </li>
                        </ul>
                    </li> -->
                </ul>
                <!-- END SIDEBAR MENU -->
                <!-- END SIDEBAR MENU -->
            </div>
            <!-- END SIDEBAR -->
        </div>
        <!-- END SIDEBAR -->
        <!-- BEGIN CONTENT -->
        <div class="page-content-wrapper">
            <!-- BEGIN CONTENT BODY -->
            <div class="page-content">
                <div class="container">
                    <div class="clearfix"></div>
                    <div class="portlet box dark-grey">
                        <div class="portlet-title">
                            <div class="caption">
                                <span class="caption-subject bold uppercase">Cash Report</span>
                            </div>
                            <div class="tools">
                                <a href="javascript:;" class="collapse"> </a>
                            </div>
                        </div>
                        <div class="portlet-body" style="display: none;">
                            <form id="formFilter" onsubmit="return false;" class="form-label-left">
                                <div class="form-body">
                                    <div class="row">
                                        <div class="col-xs-12 col-md-3">
                                            <div class="form-group">
                                                <label>From Date</label>
                                                <input type="text" autocomplete="off" placeholder="yyyy-mm-dd" required
                                                    class="form-control fromDate" required name="fromDate">
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-md-3">
                                            <div class="form-group">
                                                <label>To Date</label>
                                                <input type="text" autocomplete="off" placeholder="yyyy-mm-dd" class="form-control toDate"
                                                    required name="toDate">
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-md-3">
                                            <div class="form-group">
                                                <label>Select Branch</label>
                                                <select name="branch" class="form-control select select2 selectBranch">
                                                    <option value="-2">All Branches</option>
                                                    <option value="-1">Owned</option>
                                                    <option value="0">Franchise</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-sm-2 col-xs-4">
                                            <div class="form-group">
                                                <br />
                                                <button type="submit" class="btn btn-primary btn-block btn-icon"><i class="fa fa-search"
                                                        aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <div class="row">
                                <div class="col-md-12 col-sm-12">
                                    <div class="portlet light ">
                                        <div class="portlet-title">
                                            <div class="caption caption-md">
                                                <i class="icon-bar-chart font-green"></i>
                                                <span class="caption-subject font-green uppercase bold">Cash Report</span>
                                            </div>
                                        </div>
                                        <div class="portlet-body">
                                            <div class="row list-separated">
                                                <div class="col-md-3 col-sm-3 col-xs-6">
                                                    <div class="font-grey-mint font-sm"> Total Receipts</div>
                                                    <div class="uppercase font-hg font-red-flamingo" id="totalReceipts">
                                                        0

                                                    </div>
                                                </div>
                                                <div class="col-md-3 col-sm-3 col-xs-6">
                                                    <div class="font-grey-mint font-sm"> Total Revenue </div>
                                                    <div class="uppercase font-hg theme-font" id="totalReceiptAmount">0
                                                        <!--                                                <span class="font-lg font-grey-mint">Rs</span>-->
                                                    </div>
                                                </div>

                                            </div>
                                            <!--                                    <div id="highcharts_1"></div>
                                </div>-->
                                            <div class="row">
                                                <div class="col col-sm-12">
                                                    <table id="tableCashReport" class="table table-striped table-bordered table-hover table-checkable order-column">
                                                        <thead>
                                                            <th>Branch</th>
                                                            <th>Receipts</th>
                                                            <th>Net Amount</th>
                                                            <th>Cash</th>
                                                            <th>Card</th>
                                                            <th>Cheque/DD</th>
                                                            <th>Online/NEFT</th>
                                                        </thead>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-md-12 col-sm-12">
                                    <div class="portlet light ">
                                        <div class="portlet-title">
                                            <div class="caption caption-md">
                                                <i class="icon-bar-chart font-green"></i>
                                                <span class="caption-subject font-green uppercase bold">Cash Report
                                                    Detail</span>
                                            </div>
                                        </div>
                                        <div class="portlet-body">

                                            <!--                                    <div id="highcharts_1"></div>
                                </div>-->
                                            <div class="row">
                                                <div class="col col-sm-12">
                                                    <table id="tableCashReportDetail" class="table table-striped table-bordered table-hover table-checkable order-column">
                                                        <thead>
                                                            <th>Date</th>
                                                            <th>Receipt Number</th>
                                                            <th>Patient</th>
                                                            <th>Amount</th>
                                                            <th>Branch</th>
                                                        </thead>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <!-- END DASHBOARD STATS 1-->
                            </div>
                        </div>
                    </div>
                    <div class="portlet box dark-grey">
                        <div class="portlet-title">
                            <div class="caption">
                                <span class="caption-subject bold uppercase">OPD Report</span>
                            </div>
                            <div class="tools">
                                <a href="javascript:;" class="collapse"> </a>

                            </div>
                        </div>
                        <div class="portlet-body" style="display: none;">
                            <form id="formFilterOpd" onsubmit="return false;" class="form-label-left">
                                <div class="form-body">
                                    <div class="row">
                                        <div class="col-xs-12 col-md-3">
                                            <div class="form-group">
                                                <label>From Date</label>
                                                <input type="text" autocomplete="off" placeholder="yyyy-mm-dd" required
                                                    class="form-control fromDate" required name="fromDate">
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-md-3">
                                            <div class="form-group">
                                                <label>To Date</label>
                                                <input type="text" autocomplete="off" placeholder="yyyy-mm-dd" class="form-control toDate"
                                                    required name="toDate">
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-md-3">
                                            <div class="form-group">
                                                <label>Select Branch</label>
                                                <select name="branch" class="form-control select select2 selectBranch">
                                                    <option value="-2">All Branches</option>
                                                    <option value="-1">Owned</option>
                                                    <option value="0">Franchise</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-sm-2 col-xs-4">
                                            <div class="form-group">
                                                <br />
                                                <button type="submit" class="btn btn-primary btn-block btn-icon"><i class="fa fa-search"
                                                        aria-hidden="true"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <div class="row">
                                <div class="col-md-6 col-sm-12">
                                    <div class="portlet light ">
                                        <div class="portlet-title">
                                            <div class="caption caption-md">
                                                <i class="icon-bar-chart font-green"></i>
                                                <span class="caption-subject font-green uppercase bold">Branch Overview</span>

                                            </div>



                                        </div>
                                        <div class="portlet-body">
                                            <div class="row list-separated">
                                                <div class="col-md-3 col-sm-3 col-xs-6">
                                                    <div class="font-grey-mint font-sm"> New Patients</div>
                                                    <div class="uppercase font-hg font-red-flamingo" id="newPatient"> 0

                                                    </div>
                                                </div>
                                                <div class="col-md-3 col-sm-3 col-xs-6">
                                                    <div class="font-grey-mint font-sm"> Follow ups </div>
                                                    <div class="uppercase font-hg theme-font" id="followUp">0
                                                        <!--                                                <span class="font-lg font-grey-mint">Rs</span>-->
                                                    </div>
                                                </div>
                                                <div class="col-md-3 col-sm-3 col-xs-6">
                                                    <div class="font-grey-mint font-sm">No Show</div>
                                                    <div class="uppercase font-hg theme-font" id="noShow">0
                                                        <!--                                                <span class="font-lg font-grey-mint">Rs</span>-->
                                                    </div>
                                                </div>
                                            </div>
                                            <!--                                    <div id="highcharts_1"></div>
                                </div>-->
                                            <div class="row">
                                                <div class="col col-sm-12">
                                                    <table id="tableOpdReport" class="table table-striped table-bordered table-hover table-checkable order-column">
                                                        <thead>
                                                            <th>Branch</th>
                                                            <th>New</th>
                                                            <th>Follow Up</th>
                                                            <th>No Show</th>
                                                        </thead>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-md-6 col-sm-12">
                                    <div class="portlet light ">
                                        <div class="portlet-title">
                                            <div class="caption caption-md">
                                                <i class="icon-bar-chart font-green"></i>
                                                <span class="caption-subject font-green uppercase bold">Missed Visit</span>
                                            </div>
                                        </div>
                                        <div class="portlet-body">
                                            <!--                                    <div id="highcharts_1"></div>
                                </div>-->
                                            <div class="row">
                                                <div class="col col-sm-12">
                                                    <table id="tableOpdReportDetail" class="table table-striped table-bordered table-hover table-checkable order-column">
                                                        <thead>
                                                            <th>Branch</th>
                                                            <th>Date</th>
                                                            <th>Patient</th>
                                                            <th>CFC</th>
                                                            <th>Number</th>
                                                        </thead>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <!-- END DASHBOARD STATS 1-->
                            </div>
                        </div>
                    </div>
                    <div class="portlet box dark-grey">
                        <div class="portlet-title">
                            <div class="caption">
                                <span class="caption-subject bold uppercase">Procedure Report</span>
                            </div>
                            <div class="tools">
                                <a href="javascript:;" class="collapse"> </a>

                            </div>
                        </div>
                        <div class="portlet-body" style="display: none;">
                            <form id="formFilterProcedure" onsubmit="return false;" class="form-label-left">
                                <div class="form-body">
                                    <div class="row">
                                        <div class="col-xs-12 col-md-3">
                                            <div class="form-group">
                                                <label>From Date</label>
                                                <input type="text" autocomplete="off" placeholder="yyyy-mm-dd" required
                                                    class="form-control fromDate" required name="fromDate">
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-md-3">
                                            <div class="form-group">
                                                <label>To Date</label>
                                                <input type="text" autocomplete="off" placeholder="yyyy-mm-dd" class="form-control toDate"
                                                    required name="toDate">
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-md-3">
                                            <div class="form-group">
                                                <label>Select Procedure</label>
                                                <select name="procedure" class="form-control select select2 " id="selectProcedure"
                                                    required>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-sm-2 col-xs-4">
                                            <div class="form-group">
                                                <br />
                                                <button type="submit" class="btn btn-primary btn-block btn-icon"><i class="fa fa-search"
                                                        aria-hidden="true"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <div class="row">
                                <div class="col-md-12 col-sm-12">
                                    <div class="portlet light ">
                                        <div class="portlet-title">
                                            <div class="caption caption-md">
                                                <i class="icon-bar-chart font-green"></i>
                                                <span class="caption-subject font-green uppercase bold">Report</span>

                                            </div>



                                        </div>
                                        <div class="portlet-body ">

                                            <!--                                    <div id="highcharts_1"></div>
                                </div>-->
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <table id="tableProcedureReport" class="table table-striped table-bordered table-hover table-checkable order-column">
                                                        <thead>
                                                            <th>Name</th>
                                                            <th>Performed</th>
                                                            <th>Cost Inclusive</th>

                                                        </thead>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <!-- END DASHBOARD STATS 1-->
                            </div>
                        </div>
                    </div>
                    <div class="portlet box dark-grey">
                        <div class="portlet-title">
                            <div class="caption">
                                <span class="caption-subject bold uppercase">Procedure Report:Branch</span>
                            </div>
                            <div class="tools">
                                <a href="javascript:;" class="collapse"> </a>

                            </div>
                        </div>
                        <div class="portlet-body" style="display: none;">
                            <form id="formFilterProcedureBranch" onsubmit="return false;" class="form-label-left">
                                <div class="form-body">
                                    <div class="row">
                                        <div class="col-xs-12 col-md-3">
                                            <div class="form-group">
                                                <label>From Date</label>
                                                <input type="text" autocomplete="off" placeholder="yyyy-mm-dd" required
                                                    class="form-control fromDate" required name="fromDate">
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-md-3">
                                            <div class="form-group">
                                                <label>To Date</label>
                                                <input type="text" autocomplete="off" placeholder="yyyy-mm-dd" class="form-control toDate"
                                                    required name="toDate">
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-md-3">
                                            <div class="form-group">
                                                <label>Select Branch</label>
                                                <select name="branch" class="form-control select select2 selectBranch"
                                                    required>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-sm-2 col-xs-4">
                                            <div class="form-group">
                                                <br />
                                                <button type="submit" class="btn btn-primary btn-block btn-icon"><i class="fa fa-search"
                                                        aria-hidden="true"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <div class="row">
                                <div class="col-md-12 col-sm-12">
                                    <div class="portlet light ">
                                        <div class="portlet-title">
                                            <div class="caption caption-md">
                                                <i class="icon-bar-chart font-green"></i>
                                                <span class="caption-subject font-green uppercase bold">Report</span>
                                            </div>
                                        </div>
                                        <div class="portlet-body">

                                            <!--                                    <div id="highcharts_1"></div>
                                </div>-->
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <table id="tableProcedureBranchReport" class="table table-striped table-bordered table-hover table-checkable order-column">
                                                        <thead>
                                                            <th>Name</th>
                                                            <th>Performed</th>
                                                            <th>Cost Inclusive</th>

                                                        </thead>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <!-- END DASHBOARD STATS 1-->
                            </div>
                        </div>
                    </div>

                    <div class="portlet box dark-grey">
                        <div class="portlet-title">
                            <div class="caption">
                                <span class="caption-subject bold uppercase">Stock Report</span>
                            </div>
                            <div class="tools">
                                <a href="javascript:;" class="collapse"> </a>

                            </div>
                        </div>
                        <div class="portlet-body" style="display: none;">
                            <form id="formFilterStock" onsubmit="return false;" class="form-label-left">
                                <div class="form-body">
                                    <div class="row">
                                        <div class="col-xs-12 col-md-3">
                                            <div class="form-group">
                                                <label>From Date</label>
                                                <input type="text" autocomplete="off" placeholder="yyyy-mm-dd" required
                                                    class="form-control fromDate" required name="fromDate">
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-md-3">
                                            <div class="form-group">
                                                <label>To Date</label>
                                                <input type="text" autocomplete="off" placeholder="yyyy-mm-dd" class="form-control toDate"
                                                    required name="toDate">
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-md-3">
                                            <div class="form-group">
                                                <label>Select Branch</label>
                                                <select name="branch" class="form-control select select2 selectBranch">
                                                    <option value="-2">All Branches</option>
                                                    <option value="-1">Owned</option>
                                                    <option value="0">Franchise</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-sm-2 col-xs-4">
                                            <div class="form-group">
                                                <br />
                                                <button type="submit" class="btn btn-primary btn-block btn-icon"><i class="fa fa-search"
                                                        aria-hidden="true"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <div class="row">
                                <div class="col-md-5 col-sm-12">
                                    <div class="portlet light ">
                                        <div class="portlet-title">
                                            <div class="caption caption-md">
                                                <i class="icon-bar-chart font-green"></i>
                                                <span class="caption-subject font-green uppercase bold">Stock Report</span>
                                            </div>
                                        </div>
                                        <div class="portlet-body">
                                            <div class="row list-separated">
                                                <div class="col-md-3 col-sm-3 col-xs-6">
                                                    <div class="font-grey-mint font-sm"> Total Transfers</div>
                                                    <div class="uppercase font-hg font-red-flamingo" id="totalStockTransfer">
                                                        0

                                                    </div>
                                                </div>
                                                <div class="col-md-3 col-sm-3 col-xs-6">
                                                    <div class="font-grey-mint font-sm">Pending</div>
                                                    <div class="uppercase font-hg theme-font" id="totalStockPending">0
                                                        <!--                                                <span class="font-lg font-grey-mint">Rs</span>-->
                                                    </div>
                                                </div>

                                            </div>
                                            <!--                                    <div id="highcharts_1"></div>
                                </div>-->
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <table id="tableStockReport" class="table table-striped table-bordered table-hover table-checkable order-column">
                                                        <thead>
                                                            <th>Branch</th>
                                                            <th>Total</th>
                                                            <th>Pending</th>

                                                        </thead>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-md-7 col-sm-12">
                                    <div class="portlet light ">
                                        <div class="portlet-title">
                                            <div class="caption caption-md">
                                                <i class="icon-bar-chart font-green"></i>
                                                <span class="caption-subject font-green uppercase bold">Transactions</span>
                                            </div>
                                        </div>
                                        <div class="portlet-body">

                                            <!--                                    <div id="highcharts_1"></div>
                                </div>-->
                                            <div class="row">
                                                <div class="col col-sm-12">
                                                    <table id="tableStockReportDetail" class="table table-striped table-bordered table-hover table-checkable order-column">
                                                        <thead>
                                                            <th>Date</th>
                                                            <th>Branch</th>
                                                            <th>Reference Number</th>
                                                            <th>Status</th>
                                                        </thead>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <!-- END DASHBOARD STATS 1-->
                            </div>
                        </div>
                    </div>

                    <div class="portlet box dark-grey">
                        <div class="portlet-title">
                            <div class="caption">
                                <span class="caption-subject bold uppercase">Internal Stock Transfer Report</span>
                            </div>
                            <div class="tools">
                                <a href="javascript:;" class="collapse"> </a>

                            </div>
                        </div>
                        <div class="portlet-body" style="display: none;">
                            <form id="formFilterInterStock" onsubmit="return false;" class="form-label-left">
                                <div class="form-body">
                                    <div class="row">
                                        <div class="col-xs-12 col-md-4">
                                            <div class="form-group">
                                                <label>From Date</label>
                                                <input type="text" autocomplete="off" placeholder="yyyy-mm-dd" required
                                                    class="form-control fromDate" required name="fromDate">
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-md-4">
                                            <div class="form-group">
                                                <label>To Date</label>
                                                <input type="text" autocomplete="off" placeholder="yyyy-mm-dd" class="form-control toDate"
                                                    required name="toDate">
                                            </div>
                                        </div>

                                        <div class="col-sm-2 col-xs-4">
                                            <div class="form-group">
                                                <br />
                                                <button type="submit" class="btn btn-primary btn-block btn-icon"><i class="fa fa-search"
                                                        aria-hidden="true"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <div class="row">
                                <div class="col-md-12 col-sm-12">
                                    <div class="portlet light ">
                                        <div class="portlet-title">
                                            <div class="caption caption-md">
                                                <i class="icon-bar-chart font-green"></i>
                                                <span class="caption-subject font-green uppercase bold">Transactions</span>
                                            </div>
                                        </div>
                                        <div class="portlet-body">

                                            <!--                                    <div id="highcharts_1"></div>
                                </div>-->
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <table id="tableInterStockReport" class="table table-striped table-bordered table-hover table-checkable order-column">
                                                        <thead>
                                                            <th>Date</th>
                                                            <th>Reference</th>
                                                            <th>Source</th>
                                                            <th>Destination</th>
                                                            <th>Status</th>
                                                        </thead>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <!-- END DASHBOARD STATS 1-->
                            </div>
                        </div>
                    </div>

                    <div class="portlet box dark-grey">
                        <div class="portlet-title">
                            <div class="caption">
                                <span class="caption-subject bold uppercase">Customer Reference Source</span>
                            </div>
                            <div class="tools">
                                <a href="javascript:;" class="collapse"> </a>

                            </div>
                        </div>
                        <div class="portlet-body" style="display: none;">
                            <form id="formFilterSource" onsubmit="return false;" class="form-label-left">
                                <div class="form-body">
                                    <div class="row">
                                        <div class="col-xs-12 col-md-3">
                                            <div class="form-group">
                                                <label>From Date</label>
                                                <input type="text" autocomplete="off" placeholder="yyyy-mm-dd" required
                                                    class="form-control fromDate" required name="fromDate">
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-md-3">
                                            <div class="form-group">
                                                <label>To Date</label>
                                                <input type="text" autocomplete="off" placeholder="yyyy-mm-dd" class="form-control toDate"
                                                    required name="toDate">
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-md-3">
                                            <div class="form-group">
                                                <label>Select Branch</label>
                                                <select name="branch" class="form-control select select2 selectBranch">
                                                    <option value="-2">All Branches</option>
                                                    <option value="-1">Owned</option>
                                                    <option value="0">Franchise</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-sm-2 col-xs-4">
                                            <div class="form-group">
                                                <br />
                                                <button type="submit" class="btn btn-primary btn-block btn-icon"><i class="fa fa-search"
                                                        aria-hidden="true"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <div class="row">
                                <div class="col-md-12 col-sm-12">
                                    <div class="portlet light ">
                                        <div class="portlet-title">
                                            <div class="caption caption-md">
                                                <i class="icon-bar-chart font-green"></i>
                                                <span class="caption-subject font-green uppercase bold">BranchOverview</span>
                                            </div>
                                        </div>
                                        <div class="portlet-body">

                                            <!--                                    <div id="highcharts_1"></div>
                                </div>-->
                                            <div class="row">
                                                <div class="col col-sm-12">
                                                    <table id="tableSourceReport" class="table table-striped table-bordered table-hover table-checkable order-column">
                                                        <thead>
                                                            <th>Source</th>
                                                            <th>Count</th>

                                                        </thead>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <!-- END DASHBOARD STATS 1-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END CONTENT BODY -->
        </div>
        <!-- END CONTENT -->

        <div class="page-footer">
            <div class="page-footer-inner"> 2018 &copy; Cocoon ERP
                <a href="http://fidescs.com/" target="_blank">FIDES</a>
            </div>
            <div class="scroll-to-top">
                <i class="icon-arrow-up"></i>
            </div>
        </div>
        <!-- END FOOTER -->
        <!--[if lt IE 9]>
    <script src="../assets/global/plugins/respond.min.js"></script>
    <script src="../assets/global/plugins/excanvas.min.js"></script> 
    <![endif]-->
        <!-- BEGIN CORE PLUGINS -->
        <script src="assets/js/global/jquery.min.js" type="text/javascript"></script>
        <script src="assets/js/global/bootstrap.min.js" type="text/javascript"></script>
        <!-- <script src="../assets/global/plugins/js.cookie.min.js" type="text/javascript"></script> -->
        <script src="assets/js/global/bootstrap-hover-dropdown.min.js" type="text/javascript"></script>
        <script src="assets/js/global/jquery.slimscroll.min.js" type="text/javascript"></script>
        <script src="assets/js/global/jquery.blockui.min.js" type="text/javascript"></script>
        <script src="assets/js/global/jquery.uniform.min.js" type="text/javascript"></script>
        <script src="assets/js/global/bootstrap-switch.min.js" type="text/javascript"></script>
        <!--<script src="assets/js/global/datatable.js" type="text/javascript"></script>-->
        <script src="assets/js/global/datatables.min.js" type="text/javascript"></script>
        <script src="assets/js/global/datatables.bootstrap.js" type="text/javascript"></script>
        <!--<script src="assets/js/global/table-datatables-buttons.min.js" type="text/javascript"></script>-->
        <!-- END CORE PLUGINS -->

        <!-- BEGIN PAGE LEVEL PLUGINS -->
        <script src="assets/js/layout/moment.min.js" type="text/javascript"></script>
        <!--<script src="assets/scripts/moment2.8.4.js" type="text/javascript"></script>-->
        <script src="assets/scripts/sorting.js" type="text/javascript"></script>
        <script src="assets/js/layout/morris.min.js" type="text/javascript"></script>
        <!--<script src="assets/js/layout/raphael-min.js" type="text/javascript"></script>-->
        <script src="assets/js/layout/jquery.waypoints.min.js" type="text/javascript"></script>
        <script src="assets/js/layout/jquery.counterup.min.js" type="text/javascript"></script>
        <script src="assets/js/global/app.min.js" type="text/javascript"></script>
        <script src="assets/js/layout/dashboard.min.js" type="text/javascript"></script>
        <script src="assets/js/global/select2.full.min.js" type="text/javascript"></script>
        <script src="assets/js/global/components-select2.min.js" type="text/javascript"></script>
        <!--        <script src="assets/js/global/highcharts.js" type="text/javascript"></script>-->

        <!-- END PAGE LEVEL PLUGINS -->
        <script src="assets/scripts/home.js" type="text/javascript"></script>
        <!-- BEGIN THEME LAYOUT SCRIPTS -->
        <script src="assets/js/layout/daterangepicker.min.js" type="text/javascript"></script>
        <script src="assets/js/layout/bootstrap-datepicker.min.js" type="text/javascript"></script>
        <script src="assets/js/layout/bootstrap-timepicker.min.js" type="text/javascript"></script>
        <script src="assets/js/layout/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
        <script src="assets/js/layout/layout.min.js" type="text/javascript"></script>
        <script src="assets/js/layout/demo.min.js" type="text/javascript"></script>
        <script src="assets/js/global/quick-sidebar.min.js" type="text/javascript"></script>
        <script src="assets/scripts/loadMenu.js" type="text/javascript"></script>


</body>

</html>