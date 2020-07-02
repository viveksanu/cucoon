<%-- 
    Document   : roomBooking
    Created on : 26 Oct, 2018, 3:34:15 PM
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
                if(userId==4||userId==5||userId==6){
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
        <!-- BEGIN HEADER TOP -->
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
                        <a class='nav-link' data-toggle="modal" href="#modalNew">
                            <i class='icon-settings'></i>
                            <span class='title'>New Booking</span></a>
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


                    <div class="page-content-inner">
                        <div class="page-content-wrap">
                            <div class="portlet light">
                                <div class="portlet-title">
                                    <div class="caption font-dark">
                                        <span class="caption-subject bold uppercase">OT BOOKING</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <div class="row">
                                        <div class="col col-sm-12">
                                            <div class="row">
                                                <div class="col col-sm-12">
                                                    <form id="formFilter" onsubmit="return false;" class="form-horizontal form-label-left">
                                                        <div class="row">

                                                            <div class="col-xs-12 col-md-3">
                                                                <label>From Date</label>
                                                                <input type="text" autocomplete="off" placeholder="yyyy-mm-dd"
                                                                    required id="fromDate" class="form-control"
                                                                    required name="fromDate"><br>
                                                            </div>

                                                            <div class="col-xs-12 col-md-3">
                                                                <label>To Date</label>
                                                                <input type="text" autocomplete="off" placeholder="yyyy-mm-dd"
                                                                    id="toDate" class="form-control " required name="toDate"><br>
                                                            </div>
                                                            <div class="col-xs-12 col-md-3">
                                                                <label>Select Branch</label>
                                                                <select id="selectBranch" name="branch" class="form-control select select2"></select>
                                                            </div>
                                                            <div class="col-sm-2 col-xs-4">
                                                                <br>
                                                                <button type="submit" class="btn btn-primary btn-block btn-icon"><i
                                                                        class="fa fa-search" aria-hidden="true"></i></button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="portlet light">
                                <div class="portlet-body">
                                    <div class="row">
                                        <div class="col col-sm-12">
                                            <table id="tableContent" class="table table-striped table-bordered table-hover table-checkable order-column">
                                                <thead>
                                                    <th>Room</th>
                                                    <th>Name</th>
                                                    <th>CFC</th>
                                                    <th>From</th>
                                                    <th>To</th>
                                                    <th>Referred By</th>
                                                    <th>Booked By</th>
                                                    <th>Comment</th>
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
            </div>
        </div>
        <!-- END CONTENT BODY -->
    </div>
    <!-- END CONTENT -->

    <div id="modalNew" class="modal fade" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    <h4 class="modal-title">Book Speciality Room</h4>
                </div>
                <div class="modal-body">
                    <form id="formNew" onsubmit="return false;" class="form-horizontal form-label-left">

                        <div class="form-group">
                            <label class="control-label col-md-3">CFC</label>
                            <div class="col-md-6">
                                <input type="text" name="cfc" id="excfc" class="form-control" maxlength="100" required>
                            </div>
                            <div class="col-md-3">
                                <button type="button" id="buttonCFCSearch" class="form-control btn btn-primary"> Search
                                </button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Name <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <select id="selectName" name="pid" class="form-control select2" required>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Select Branch <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <select id="selectBranchNew" name="branch" class="form-control select select2"></select>
                            </div>
                        </div>

                        <!--                        <div class="form-group">
                            <label class="control-label col-md-3">CFC <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <select id="selectCfc" name="cfc" class="form-control select2" required>
                                </select>
                            </div>
                        </div>-->

                        <div class="form-group">
                            <label class="control-label col-md-3">Room <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <select id="selectRoom" name="rid" class="form-control select2" required>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Referee Doctor <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <select id="selectDoctor" name="did" class="form-control select2" required>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">From Time <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                
                                    <input type="text" name="appointmentStart" id="appointmentStart" required size="16"
                                        class="form-control" autocomplete="off">

                                <!-- /input-group -->
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3">To Time <sup class="require">*</sup></label>
                            <div class="col-md-9">

                                    <input type="text" name="appointmentStop" id="appointmentStop" required size="16"
                                        class="form-control" autocomplete="off">

                                <!-- /input-group -->
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Comment</label>
                            <div class="col-md-9">
                                <textarea maxlength="100" class="form-control" placeholder="optional" name="comment"></textarea>

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
    <div id="modalEdit" class="modal fade" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    <h4 class="modal-title">Book Speciality Room</h4>
                </div>
                <div class="modal-body">
                    <form id="formEdit" onsubmit="return false;" class="form-horizontal form-label-left">

                        <div class="form-group">
                            <label class="control-label col-md-3">CFC</label>
                            <div class="col-md-6">
                                <input autofocus type="text" name="cfc" id="eexcfc" class="form-control" maxlength="100"
                                    required>
                            </div>
                            <div class="col-md-3">
                                <button type="button" id="ebuttonCFCSearch" class="form-control btn btn-primary btn-icon">
                                    <i class="fa fa-search" aria-hidden="true"></i></button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Name <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <select id="eselectName" name="pid" class="form-control select2" required>
                                </select>
                            </div>
                        </div>
                        <!--                        <div class="form-group">
                            <label class="control-label col-md-3">CFC <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <select id="eselectCfc" name="cfc" class="form-control select2" required>
                                </select>
                            </div>
                        </div>-->
                        <div class="form-group">
                            <label class="control-label col-md-3">Select Branch <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <select id="selectBranchEdit" name="branch" class="form-control select select2"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Room <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <select id="eselectRoom" name="rid" class="form-control select2" required>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Referee Doctor <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                <select id="eselectDoctor" name="did" class="form-control select2" required>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">From Time <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                
                                    <input type="text" name="appointmentStart" id="eappointmentStart" required size="16"
                                        class="form-control" autocomplete="off">
                                  
                                <!-- /input-group -->
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3">To Time <sup class="require">*</sup></label>
                            <div class="col-md-9">
                                
                                    <input type="text" name="appointmentStop" id="eappointmentStop" required size="16"
                                        class="form-control" autocomplete="off">
                                    
                                <!-- /input-group -->
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">Comment</label>
                            <div class="col-md-9">
                                <textarea maxlength="100" id="ecomment" class="form-control" placeholder="optional"
                                    name="comment"></textarea>

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
    <script src="assets/js/global/datatable.js" type="text/javascript"></script>
    <script src="assets/js/global/datatables.min.js" type="text/javascript"></script>
    <script src="assets/js/global/datatables.bootstrap.js" type="text/javascript"></script>
    <!-- END CORE PLUGINS -->
    <!-- BEGIN PAGE LEVEL PLUGINS -->
    <script src="assets/js/layout/moment.min.js" type="text/javascript"></script>
    <script src="assets/scripts/moment2.8.4.js" type="text/javascript"></script>
    <script src="assets/scripts/sorting.js" type="text/javascript"></script>
    <script src="assets/js/layout/daterangepicker.min.js" type="text/javascript"></script>
    <script src="assets/js/layout/morris.min.js" type="text/javascript"></script>
    <script src="assets/js/layout/raphael-min.js" type="text/javascript"></script>
    <script src="assets/js/layout/jquery.waypoints.min.js" type="text/javascript"></script>
    <script src="assets/js/layout/jquery.counterup.min.js" type="text/javascript"></script>
    <!-- BEGIN THEME GLOBAL SCRIPTS -->
    <script src="assets/js/global/app.min.js" type="text/javascript"></script>
    <!-- END THEME GLOBAL SCRIPTS -->
    <!-- BEGIN PAGE LEVEL SCRIPTS -->
    <script src="assets/js/layout/dashboard.min.js" type="text/javascript"></script>
    <script src="assets/select2/js/select2.full.min.js" type="text/javascript"></script>
    <script src="assets/select2/js/components-select2.min.js" type="text/javascript"></script>
    <!-- END PAGE LEVEL SCRIPTS -->

    <script src="assets/bootstrap-daterangepicker/daterangepicker.min.js" type="text/javascript"></script>
    <script src="assets/bootstrap-datepicker/js/bootstrap-datepicker.min.js" type="text/javascript"></script>
    <script src="assets/bootstrap-timepicker/js/bootstrap-timepicker.min.js" type="text/javascript"></script>
    <script src="assets/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
    <!-- BEGIN THEME LAYOUT SCRIPTS -->
    <script src="assets/js/layout/layout.min.js" type="text/javascript"></script>
    <script src="assets/js/layout/demo.min.js" type="text/javascript"></script>
    <script src="assets/js/global/quick-sidebar.min.js" type="text/javascript"></script>
    <script src="assets/scripts/loadMenu.js" type="text/javascript"></script>
    <script src="assets/scripts/roomBooking.js" type="text/javascript"></script>
    <!-- END THEME LAYOUT SCRIPTS -->

</body>

</html>