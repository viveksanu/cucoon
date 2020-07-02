<%-- 
    Document   : treatmentFile
    Created on : 7 Dec, 2018, 2:17:02 PM
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
    <!-- <link href="css/global/plugins-md.min.css" rel="stylesheet" type="text/css" /> -->
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


</head>
<% response.setHeader("Cache-Control","no-cache"); 
  response.setHeader("Cache-Control","no-store"); 
  response.setHeader("Pragma","no-cache"); 
  response.setDateHeader ("Expires", 0); 	
	if (session != null) { 	
		if (session.getAttribute("userType") == null) { 
		response.sendRedirect("login.jsp"); 		
                        return;	 		
                }
                
                int userId=(int)session.getAttribute("userType");
                if(userId>3&&userId!=7){
                response.sendRedirect("login.jsp"); 		
                        return;    
                }
        }else{
             	response.sendRedirect("login.jsp"); 		
                        return;	
        } 	
%>
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
    </div>   <div class="page-header navbar navbar-fixed-top">
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
                    <li class='nav-item start'>
                        <a class='nav-link' > <i class='icon-settings'></i>
                            <span class='title' id="goToPayment">Payment</span></a>
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
                    <!--                 content   -->

                    <div class="row">
                        <div class="col-md-12 ">
                            <div class="portlet box blue-hoki">
                                <div class="portlet-title">
                                    <div class="caption">
                                        <span id="">Procedure History</span>
                                    </div>
                                    <div class="actions">
                                        <a data-toggle="modal" href="#modalNewProcedure" class="btn btn-default btn-sm "
                                            id="btnNewTreatment">
                                            <i class="fa fa-pencil"></i>Add Procedure</a>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-bordered table-hover table-checkable order-column" id="tableProcedure">
                                        <thead>
                                            <th>Date</th>
                                            <th>Branch</th>
                                            <th>Procedure</th>`
                                            <th>Patient</th>
                                            <th>Cost</th>
                                            <th>Discount(%)</th>
                                            <th>Inclusive</th>
                                            <th>Comment</th>

                                            <th>Added By</th>
                                            <th></th>
                                            <th></th>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-12 ">
                            <div class="portlet box blue-hoki">
                                <div class="portlet-title">
                                    <div class="caption">
                                        <span id="">Lab Investigation History</span>
                                    </div>
                                    <div class="actions">
                                        <a data-toggle="modal" href="#modalNewLIH" class="btn btn-default btn-sm "
                                            id="btnNewLIH">
                                            <i class="fa fa-pencil"></i>Add New</a>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-bordered table-hover table-checkable order-column" id="tableLih">
                                        <thead>
                                            <th>Date</th>
                                            <th>Branch</th>
                                            <th>Name</th>`
                                            <th>Patient</th>
                                            <th>Cost</th>
                                            <th>Discount(%)</th>
                                            <th>Inclusive</th>
                                            <th>Comment</th>

                                            <th>Added By</th>
                                            <th></th>
                                            <th></th>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">

                        <div class="col-md-12 ">
                            <div class="portlet box blue-hoki">
                                <div class="portlet-title">
                                    <div class="caption">
                                        <span id="">Medicine/Inventory History</span>
                                    </div>
                                    <div class="actions">
                                        <a data-toggle="modal" href="#modalNewMedicine" class="btn btn-default btn-sm "
                                            id="btnNewStock">
                                            <i class="fa fa-pencil"></i>Add Medicine/Inventory</a>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-bordered table-hover table-checkable order-column" id="tableStock">
                                        <thead>
                                            <th>Date</th>
                                            <th>Branch</th>
                                            <th>Patient</th>
                                            <th>Item</th>
                                            <th>Batch</th>`
                                            <th>Bottle</th>
                                            <th>Quantity</th>
                                            <th>Cost</th>
                                            <th>Discount(%)</th>
                                            <th>Inclusive</th>
                                            <th>Comment</th>

                                            <th>Added By</th>
                                            <th></th>
                                            <th></th>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- END CONTENT BODY -->
    </div>
    <!-- END CONTENT -->
    <div id="modalNewProcedure" class="modal fade" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    <h4 class="modal-title">Add Procedure</h4>
                </div>
                <div class="modal-body">
                    <form role="form" class="form-horizontal" id="formNewProcedure">

                        <div class="form-group">
                            <label class="control-label col-md-3">Date <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <input type="text" required autocomplete="off" name="startDate" class="form-control"
                                    maxlength="10" id="startDate">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3">Select Branch <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <select id="selectBranch" name="branch" required class="form-control select select2"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Select Patient <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <select required="true" name="patient" id="selectPatient" class="form-control  select select2"></select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3">Select Procedure <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <select required="true" name="procedure" id="selectProcedure" class="form-control  select select2"></select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3">Description</label>
                            <div class="col-md-9">
                                <textarea name="pDescription" id="pDescription" disabled class="form-control" maxlength="200"></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Cost</label>
                            <div class="col-md-9">
                                <input type="text" disabled class="form-control" id="costProcedure" value="0">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Select Discount<sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <!--<select required="true" name="discount" id="selectDiscount" class="form-control  select select2"></select>-->
                                <input type="text" class="form-control" id="selectDiscount" min="0.01" value="0" step="0.01">
                                     <label class="radio-inline">
                                         <input type="radio" name="discountProcedure" id="radioDiscountProcedureA" value="amt" checked>Amount</label>

                                <label class="radio-inline">
                                    <input type="radio" name="discountProcedure" id="radioDiscountProcedureP" value="per" >Percent</label>
                            </div>
                        </div>


                        <div class="form-group">
                            <label class="control-label col-md-3">Inclusive<sup class="require">*</sup></label>
                            <div class="col-md-9">

                                <label class="radio-inline">
                                    <input type="radio" name="free" id="radioNotFree" value="0" checked>No </label>

                                <label class="radio-inline">
                                    <input type="radio" name="free" value="1">Yes</label>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3">Comment</label>
                            <div class="col-md-9">
                                <textarea name="comment" id="comment" class="form-control" maxlength="200"></textarea>
                            </div>
                        </div>


                        <div class="form-group">
                            <div class="col-md-3 col-sm-6 col-sm-push-3">
                                <button type="submit" class="btn btn-success btn-block">Save</button>
                            </div>
                            <div class="col-md-3 col-sm-6 col-sm-push-3">
                                <button class="btn btn-primary btn-block" type="reset">Reset</button>
                            </div>

                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn dark btn-outline" data-dismiss="modal" aria-hidden="true">Close</button>

                </div>

            </div>
        </div>
    </div>

    <div id="modalEditProcedure" class="modal fade" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    <h4 class="modal-title">Procedure</h4>
                </div>
                <div class="modal-body">
                    <form role="form" class="form-horizontal" id="formEditProcedure">

                                                <div class="form-group">
                            <label class="control-label col-md-3">Select Branch <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <select id="eselectBranch" name="branch" required class="form-control select select2"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Select Patient <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <select required="true" name="patient" id="eselectPatient" class="form-control  select select2"></select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3">Select Procedure <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <select required="true" name="procedure" id="eselectProcedure" class="form-control  select select2"></select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3">Description</label>
                            <div class="col-md-9">
                                <textarea name="epDescription" id="epDescription" disabled class="form-control" maxlength="200"></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Cost</label>
                            <div class="col-md-9">
                                <input type="text" disabled class="form-control" id="ecostProcedure">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Discount<sup class="require">*</sup></label>
                            <div class="col-md-9">
                             <input type="text" class="form-control" id="selectDiscounte" min="0.01" value="0" step="0.01">
                                     <label class="radio-inline">
                                         <input type="radio" name="discountProceduree" id="radioDiscountProcedureAe" value="amt" >Amount</label>

                                <label class="radio-inline">
                                    <input type="radio" name="discountProceduree" id="radioDiscountProcedurePe" value="per" checked>Percent</label>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3">Date <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <input type="text" required autocomplete="off" name="startDate" class="form-control"
                                    maxlength="10" id="estartDate">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3">Inclusive <sup class="require">*</sup></label>
                            <div class="col-md-9">

                                <label class="radio-inline">
                                    <input type="radio" name="efree" id="eradioNotFree" value="0">No </label>

                                <label class="radio-inline">
                                    <input type="radio" name="efree" id="eradioFree" value="1">Yes</label>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3">Comment</label>
                            <div class="col-md-9">
                                <textarea name="comment" id="ecomment" class="form-control" maxlength="200"></textarea>
                            </div>
                        </div>


                        <div class="form-group">
                            <div class="col-md-3 col-sm-6 col-sm-push-3">
                                <button type="submit" class="btn btn-success btn-block">Save</button>
                            </div>
                            <div class="col-md-3 col-sm-6 col-sm-push-3">
                                <button class="btn btn-primary btn-block" type="reset">Reset</button>
                            </div>

                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn dark btn-outline" data-dismiss="modal" aria-hidden="true">Close</button>

                </div>

            </div>
        </div>
    </div>

    
    
    <div id="modalNewMedicine" class="modal fade" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    <h4 class="modal-title">Add Medicine</h4>
                </div>
                <div class="modal-body">
                    <form role="form" class="form-horizontal" id="formNewMedicine">

                        <div class="form-group">
                            <label class="control-label col-md-3">Date <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <input type="text" required autocomplete="off" name="startDate" class="form-control"
                                    maxlength="10" id="startDateI">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Select Patient <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <select required="true" name="patient" id="selectPatientI" class="form-control  select select2"></select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3">Select Item <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <select required="true" name="item" onchange="changeItem()" id="selectItem" class="form-control  select select2"></select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3">Select Batch <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <select required="true" name="batch" id="selectBatch" onchange="changeBatch()" class="form-control  select select2"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Select Bottle <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <select required="true" name="bottle" id="selectBottle" class="form-control  select select2"
                                    onchange="bottleChange()"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Quantity</label>
                            <div class="col-md-9">
                                <input type="number" name="quantity" value="1" min="1" required class="form-control" id="quantity">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Select Discount<sup class="require">*</sup></label>
                            <div class="col-md-9">
                              <input type="text" class="form-control" id="selectDiscountStock" min="0.01" value="0" step="0.01">
                                     <label class="radio-inline">
                                         <input type="radio" name="discountStock" id="radioDiscountStockA" value="amt" checked>Amount</label>

                                <label class="radio-inline">
                                    <input type="radio" name="discountStock" id="radioDiscountStockP" value="per" >Percent</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">MRP</label>
                            <div class="col-md-9">
                                <input type="text" disabled class="form-control" id="mrp">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Current Stock</label>
                            <div class="col-md-9">
                                <input type="text" id="currentStock" disabled class="form-control" disabled>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Expiry Date</label>
                            <div class="col-md-9">
                                <input type="text" id="expiryDate" disabled class="form-control" disabled>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Total Cost</label>
                            <div class="col-md-9">
                                <input type="text" disabled class="form-control" id="costMedicine">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3">Inclusive <sup class="require">*</sup></label>
                            <div class="col-md-9">

                                <label class="radio-inline">
                                    <input type="radio" name="freeI" id="radioNotFreeI" value="0" checked>No </label>

                                <label class="radio-inline">
                                    <input type="radio" name="freeI" value="1">Yes</label>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3">Comment</label>
                            <div class="col-md-9">
                                <textarea name="comment" id="commentI" class="form-control" maxlength="200"></textarea>
                            </div>
                        </div>


                        <div class="form-group">
                            <div class="col-md-3 col-sm-6 col-sm-push-3">
                                <button type="submit" class="btn btn-success btn-block">Save</button>
                            </div>
                            <div class="col-md-3 col-sm-6 col-sm-push-3">
                                 <button class="btn btn-primary btn-block" type="button" id="resetNewMedicine">Reset</button>
                            </div>

                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn dark btn-outline" data-dismiss="modal" aria-hidden="true">Close</button>

                </div>

            </div>
        </div>
    </div>

    <div id="modalEditMedicine" class="modal fade" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    <h4 class="modal-title">Add Medicine</h4>
                </div>
                <div class="modal-body">
                    <form role="form" class="form-horizontal" id="formEditMedicine">

                        <div class="form-group">
                            <label class="control-label col-md-3">Date <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <input type="text" required autocomplete="off" name="startDate" class="form-control"
                                    maxlength="10" id="estartDateI">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Select Patient <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <select required="true" name="patient" id="eselectPatientI" class="form-control  select select2"></select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3">Select Item <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <select required="true" name="item" onchange="echangeItem()" id="eselectItem" class="form-control  select select2"></select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3">Select Batch <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <select required="true" name="batch" id="eselectBatch" onchange="echangeBatch()" class="form-control  select select2"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Select Bottle <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <select required="true" name="bottle" id="eselectBottle" class="form-control  select select2"
                                    onchange="ebottleChange()"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Quantity</label>
                            <div class="col-md-9">
                                <input type="number" name="quantity" value="1" min="1" required class="form-control" id="equantity">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Select Discount % <sup class="require">*</sup></label>
                            <div class="col-md-9">
                               <input type="text" class="form-control" id="selectDiscountStocke" min="0.01" value="0" step="0.01">
                                     <label class="radio-inline">
                                         <input type="radio" name="discountStocke" id="radioDiscountStockAe" value="amt">Amount</label>

                                <label class="radio-inline">
                                    <input type="radio" name="discountStocke" id="radioDiscountStockPe" value="per" checked>Percent</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">MRP</label>
                            <div class="col-md-9">
                                <input type="text" disabled class="form-control" id="emrp">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Current Stock</label>
                            <div class="col-md-9">
                                <input type="text" id="ecurrentStock" disabled class="form-control" disabled>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Expiry Date</label>
                            <div class="col-md-9">
                                <input type="text" id="eexpiryDate" disabled class="form-control" disabled>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Total Cost</label>
                            <div class="col-md-9">
                                <input type="text" disabled class="form-control" id="ecostMedicine">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3">Inclusive <sup class="require">*</sup></label>
                            <div class="col-md-9">

                                <label class="radio-inline">
                                    <input type="radio" name="efreeI" id="eradioNotFreeI" value="0" checked>No </label>

                                <label class="radio-inline">
                                    <input type="radio" name="efreeI" id="eradioFreeI" value="1">Yes</label>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3">Comment</label>
                            <div class="col-md-9">
                                <textarea name="comment" id="ecommentI" class="form-control" maxlength="200"></textarea>
                            </div>
                        </div>


                        <div class="form-group">
                            <div class="col-md-3 col-sm-6 col-sm-push-3">
                                <button type="submit" class="btn btn-success btn-block">Save</button>
                            </div>
                            <div class="col-md-3 col-sm-6 col-sm-push-3">
                                <button class="btn btn-primary btn-block" type="button" id="resetEditMedicine">Reset</button>
                            </div>

                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn dark btn-outline" data-dismiss="modal" aria-hidden="true">Close</button>

                </div>

            </div>
        </div>
    </div>

    
    <div id="modalNewLIH" class="modal fade" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    <h4 class="modal-title">Add</h4>
                </div>
                <div class="modal-body">
                    <form role="form" class="form-horizontal" id="formNewLih">

                        <div class="form-group">
                            <label class="control-label col-md-3">Date <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <input type="text" required autocomplete="off" name="startDate" class="form-control"
                                    maxlength="10" id="lihstartDate">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3">Select Branch <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <select id="lihselectBranch" name="branch" required class="form-control select select2"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Select Patient <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <select required="true" name="patient" id="lihselectPatient" class="form-control  select select2"></select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3">Select Lab Investigation Report <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <select required="true" name="lih" id="selectLih" class="form-control  select select2"></select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3">Description</label>
                            <div class="col-md-9">
                                <textarea id="lihDescription" disabled class="form-control" maxlength="200"></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Cost</label>
                            <div class="col-md-9">
                                <input type="text" disabled class="form-control" id="costLih" value="0">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Select Discount<sup class="require">*</sup></label>
                            <div class="col-md-9">
                             <input type="text" class="form-control" id="selectDiscountLih" min="0.01" value="0" step="0.01">
                                     <label class="radio-inline">
                                         <input type="radio" name="discountLih" id="radioDiscountLihA" value="amt" checked>Amount</label>

                                <label class="radio-inline">
                                    <input type="radio" name="discountLih" id="radioDiscountLihP" value="per" >Percent</label>
                            </div>
                        </div>


                        <div class="form-group">
                            <label class="control-label col-md-3">Inclusive<sup class="require">*</sup></label>
                            <div class="col-md-9">

                                <label class="radio-inline">
                                    <input type="radio" name="lihfree" id="lihradioNotFree" value="0" checked>No </label>

                                <label class="radio-inline">
                                    <input type="radio" name="lihfree" value="1">Yes</label>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3">Comment</label>
                            <div class="col-md-9">
                                <textarea name="comment" id="lihcomment" class="form-control" maxlength="200"></textarea>
                            </div>
                        </div>


                        <div class="form-group">
                            <div class="col-md-3 col-sm-6 col-sm-push-3">
                                <button type="submit" class="btn btn-success btn-block">Save</button>
                            </div>
                            <div class="col-md-3 col-sm-6 col-sm-push-3">
                                <button class="btn btn-primary btn-block" type="reset">Reset</button>
                            </div>

                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn dark btn-outline" data-dismiss="modal" aria-hidden="true">Close</button>

                </div>

            </div>
        </div>
    </div>

    <div id="modalEditLih" class="modal fade" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    <h4 class="modal-title">Edit</h4>
                </div>
                <div class="modal-body">
                    <form role="form" class="form-horizontal" id="formEditLih">

                                                <div class="form-group">
                            <label class="control-label col-md-3">Select Branch <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <select id="elihselectBranch" name="branch" required class="form-control select select2"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Select Patient <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <select required="true" name="patient" id="elihselectPatient" class="form-control  select select2"></select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3">Select Lab Investigation Report <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <select required="true" name="lih" id="eselectLih" class="form-control  select select2"></select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3">Description</label>
                            <div class="col-md-9">
                                <textarea name="epDescription" id="elihDescription" disabled class="form-control" maxlength="200"></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Cost</label>
                            <div class="col-md-9">
                                <input type="text" disabled class="form-control" id="ecostLih">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Select Discount <sup class="require">*</sup></label>
                            <div class="col-md-9">
                             <input type="text" class="form-control" id="selectDiscountLihe" min="0.01" value="0" step="0.01">
                                     <label class="radio-inline">
                                         <input type="radio" name="discountLihe" id="radioDiscountLihAe" value="amt" >Amount</label>

                                <label class="radio-inline">
                                    <input type="radio" name="discountLihe" id="radioDiscountLihPe" value="per" checked >Percent</label>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3">Date <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <input type="text" required autocomplete="off" name="startDate" class="form-control"
                                    maxlength="10" id="elihstartDate">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3">Inclusive <sup class="require">*</sup></label>
                            <div class="col-md-9">

                                <label class="radio-inline">
                                    <input type="radio" name="elihfree" id="elihradioNotFree" value="0">No </label>

                                <label class="radio-inline">
                                    <input type="radio" name="elihfree" id="elihradioFree" value="1">Yes</label>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3">Comment</label>
                            <div class="col-md-9">
                                <textarea name="comment" id="elihcomment" class="form-control" maxlength="200"></textarea>
                            </div>
                        </div>


                        <div class="form-group">
                            <div class="col-md-3 col-sm-6 col-sm-push-3">
                                <button type="submit" class="btn btn-success btn-block">Save</button>
                            </div>
                            <div class="col-md-3 col-sm-6 col-sm-push-3">
                                <button class="btn btn-primary btn-block" type="reset">Reset</button>
                            </div>

                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn dark btn-outline" data-dismiss="modal" aria-hidden="true">Close</button>

                </div>

            </div>
        </div>
    </div>

    <!-- END CONTAINER -->
    <!-- BEGIN FOOTER -->
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
    <!-- END CORE PLUGINS -->
    <!-- BEGIN PAGE LEVEL PLUGINS -->
    <script src="assets/js/layout/moment.min.js" type="text/javascript"></script>
    <!--<script src="assets/scripts/moment2.8.4.js" type="text/javascript"></script>-->
    <script src="assets/scripts/sorting.js" type="text/javascript"></script>
    <script src="assets/js/layout/morris.min.js" type="text/javascript"></script>
    <!--        <script src="assets/js/layout/raphael-min.js" type="text/javascript"></script>
        <script src="assets/js/layout/jquery.waypoints.min.js" type="text/javascript"></script>
        <script src="assets/js/layout/jquery.counterup.min.js" type="text/javascript"></script>-->
    <script src="assets/js/global/app.min.js" type="text/javascript"></script>
    <script src="assets/js/layout/dashboard.min.js" type="text/javascript"></script>
    <script src="assets/js/global/select2.full.min.js" type="text/javascript"></script>
    <script src="assets/js/global/components-select2.min.js" type="text/javascript"></script>
    <!-- END PAGE LEVEL PLUGINS -->

    <!-- BEGIN THEME LAYOUT SCRIPTS -->
    <script src="assets/js/layout/daterangepicker.min.js" type="text/javascript"></script>
    <script src="assets/js/layout/bootstrap-datepicker.min.js" type="text/javascript"></script>
    <script src="assets/js/layout/bootstrap-timepicker.min.js" type="text/javascript"></script>
    <script src="assets/js/layout/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
    <script src="assets/js/layout/layout.min.js" type="text/javascript"></script>
    <script src="assets/js/layout/demo.min.js" type="text/javascript"></script>
     <script src="assets/js/global/quick-sidebar.min.js" type="text/javascript"></script> <script src="assets/scripts/loadMenu.js" type="text/javascript"></script>
    <script src="assets/scripts/treatmentFile.js" type="text/javascript"></script>
    <!-- END THEME LAYOUT SCRIPTS -->

</body>

</html>