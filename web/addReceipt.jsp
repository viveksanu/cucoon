<%-- 
    Document   : addReceipt
    Created on : 20 Dec, 2018, 8:40:10 PM
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
    <% response.setHeader("Cache-Control","no-cache"); 
  response.setHeader("Cache-Control","no-store"); 
  response.setHeader("Pragma","no-cache"); 
  response.setDateHeader ("Expires", 0); 	
//response.sendRedirect("login.jsp"); 			
  if (session != null) { 	
		if (session.getAttribute("userType") == null) { 
			response.sendRedirect("login.jsp"); 		
                        return;
                }
//                
                int userId=(int)session.getAttribute("userType");
                if(userId>3){
                    response.sendRedirect("login.jsp");
                return;
                }
        }else{
            response.sendRedirect("login.jsp"); 		
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
                    <li class='nav-item start'>
                        <a class='nav-link' data-toggle="modal" id="newInvoice"> <i class='icon-settings'></i>
                            <span class='title'>View Invoice</span></a>
                    </li>
                    <li class='nav-item start'>
                        <a class='nav-link' data-toggle="modal" id="detailedInvoice"> <i class='icon-settings'></i>
                            <span class='title'>View Detailed Invoice</span></a>
                    </li>
                </ul>
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
                        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <div class="dashboard-stat blue">
                                <div class="visual">
                                    <i class="fa fa-comments"></i>
                                </div>
                                <div class="details">
                                    <div class="number">
                                        <span data-counter="counterup" id="totalAmount">0</span>
                                    </div>
                                    <div class="desc"> Bill Amount </div>
                                </div>

                            </div>
                        </div>

                        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <div class="dashboard-stat green">
                                <div class="visual">
                                    <i class="fa fa-shopping-cart"></i>
                                </div>
                                <div class="details">
                                    <div class="number">
                                        <span data-counter="counterup" id="receivedAmount">0</span>
                                    </div>
                                    <div class="desc">Total Received</div>
                                </div>

                            </div>
                        </div>

                        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <div class="dashboard-stat purple">
                                <div class="visual">
                                    <i class="fa fa-globe"></i>
                                </div>
                                <div class="details">
                                    <div class="number">
                                        <span data-counter="counterup" id="balanceAmount">0</span></div>
                                    <div class="desc">Balance Amount</div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="row">
                        <div class="col-md-12 ">
                            <div class="portlet box blue-hoki">
                                <div class="portlet-title">
                                    <div class="caption">
                                        <i class="fa"></i>
                                        <span id="">Payment History</span>
                                    </div>
                                    <div class="actions">
                                        <a data-toggle="modal" href="#modalNewPayment" class="btn btn-default btn-sm "
                                            id="btnNewTreatment">
                                            <i class="fa fa-pencil"></i> New Payment</a>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-bordered table-hover table-checkable order-column" id="tableContent">
                                        <thead>
                                            <th>Ref</th>
                                            <th>Date</th>
                                            <th>Name</th>`
                                            <th >asd</th>
                                            <th>Description</th>
                                            <th>Amount</th>
                                            <th>Mode</th>
                                            <th>Branch</th>
                                            <th>Added By</th>
                                            <th></th>
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
    <div id="modalNewPayment" class="modal fade" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    <h4 class="modal-title">New Payment</h4>
                </div>
                <div class="modal-body">
                    <form role="form" class="form-horizontal" id="formNewPayment">
                        
                        <div class="form-group">
                            <label class="control-label col-md-3">Date <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <input type="text" required autocomplete="off" name="date" class="form-control"
                                    maxlength="10" id="receiptDate">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3">Name <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <input type="text" autocomplete="off" required name="name" class="form-control" id="name">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Select Procedure</label>
                            <div class="col-md-9">
                                <select  id="selectProcedure" class="form-control select2-multiple" multiple>
                                  </select>
                            </div>
                        </div>
                                                <div class="form-group">
                            <label class="control-label col-md-3">Select Lab Investigation Report</label>
                            <div class="col-md-9">
                                <select  id="selectLih" class="form-control select2-multiple" multiple>
                                  </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Select Pharmacy</label>
                            <div class="col-md-9">
                                <select  id="selectPharmacy" class="form-control select2-multiple" multiple >
                                  </select>
                            </div>
                        </div>    
                        
                        
                        <div class="form-group">
                            <label class="control-label col-md-3">Amount <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <input type="number" step="0.01" min="0" autocomplete="off" required name="amount" class="form-control"
                                    id="amount">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Payment Mode</label>
                            <div class="col-md-9">
                                <select name="mode" id="selectMode" class="form-control select2" required>
                                    <option value="Cash">Cash</option>
                                    <option value="Card">Card</option>
                                    <option value="Cheque/DD">Cheque/DD</option>
                                    <option value="Online">Online</option>
                                </select>
                            </div>
                        </div>                        
<!--
<div class="form-group">
                            <label class="control-label col-md-3">Description</label>
                            <div class="col-md-9">
                                <textarea name="description" id="description" class="form-control" maxlength="200"></textarea>
                            </div>
                        </div>-->


                        <div class="form-group">
                            <div class="col-md-3 col-sm-3 col-sm-push-3">
                                <button type="submit" class="btn btn-success btn-block">Save</button>
                            </div>
                            <div class="col-md-3 col-sm-3 col-sm-push-3">
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

    <div id="modalEditPayment" class="modal fade" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    <h4 class="modal-title">Edit Payment</h4>
                </div>
                <div class="modal-body">
                    <form role="form" class="form-horizontal" id="formEditPayment">

                        <div class="form-group">
                            <label class="control-label col-md-3">Date <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <input type="text" required autocomplete="off" name="date" class="form-control"
                                    maxlength="10" id="ereceiptDate">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3">Name <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <input type="text" autocomplete="off" required name="name" class="form-control" id="ename">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Select Procedure</label>
                            <div class="col-md-9">
                                <select  id="eselectProcedure" class="form-control select2-multiple" multiple>
                                  </select>
                            </div>
                        </div>
                                                <div class="form-group">
                            <label class="control-label col-md-3">Select Lab Investigation Report</label>
                            <div class="col-md-9">
                                <select  id="eselectLih" class="form-control select2-multiple" multiple>
                                  </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Select Pharmacy</label>
                            <div class="col-md-9">
                                <select  id="eselectPharmacy" class="form-control select2-multiple" multiple >
                                  </select>
                            </div>
                        </div> 
                        <div class="form-group">
                            <label class="control-label col-md-3">Amount <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <input type="number" step="0.01" min="0" autocomplete="off" required name="amount" class="form-control"
                                    id="eamount">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3">Payment Mode</label>
                            <div class="col-md-9">
                                <select name="mode" id="eselectMode" class="form-control select2" required>
                                    <option value="Cash">Cash</option>
                                    <option value="Card">Card</option>
                                    <option value="Cheque/DD">Cheque/DD</option>
                                    <option value="Online">Online</option>
                                </select>
                            </div>
                        </div>



                        <div class="form-group">
                            <div class="col-md-3 col-sm-3 col-sm-push-3">
                                <button type="submit" class="btn btn-success btn-block">Save</button>
                            </div>
                            <div class="col-md-3 col-sm-3 col-sm-push-3">
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
    <script src="assets/js/global/jspdf.min.js" type="text/javascript"></script>
    <script src="assets/js/global/jsPdf_Plugins.js" type="text/javascript"></script>
    <script src="assets/js/global/jspdf.plugin.autotable.js" type="text/javascript"></script>

    <!-- END PAGE LEVEL PLUGINS -->

    <!-- BEGIN THEME LAYOUT SCRIPTS -->
    <script src="assets/js/layout/daterangepicker.min.js" type="text/javascript"></script>
    <script src="assets/js/layout/bootstrap-datepicker.min.js" type="text/javascript"></script>
    <script src="assets/js/layout/bootstrap-timepicker.min.js" type="text/javascript"></script>
    <script src="assets/js/layout/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
    <script src="assets/js/layout/layout.min.js" type="text/javascript"></script>
    <script src="assets/js/layout/demo.min.js" type="text/javascript"></script>
    <script src="assets/js/global/quick-sidebar.min.js" type="text/javascript"></script>
    <script src="assets/scripts/loadMenu.js" type="text/javascript"></script>
    <script src="assets/scripts/addReceipt.js" type="text/javascript"></script>
    <!-- END THEME LAYOUT SCRIPTS -->

</body>

</html>