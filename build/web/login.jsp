<%-- 
    Document   : login
    Created on : 26 Dec, 2018, 5:06:54 PM
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
    <link href="assets/css/global/components-md.min.css" rel="stylesheet" id="style_components" type="text/css" />
    <!-- <link href="css/global/plugins-md.min.css" rel="stylesheet" type="text/css" /> -->
    <link href="assets/css/global/plugins-md.min.css" rel="stylesheet" type="text/css" />
    <!-- END THEME GLOBAL STYLES -->
    <!-- BEGIN THEME LAYOUT STYLES -->

    <link rel="stylesheet" href="assets/css/layout/login.css" />
    <!-- END THEME LAYOUT STYLES -->

    <!-- <link rel="stylesheet" type="text/css" media="screen" href="css/main.css" />
        <script src="js/main.js"></script> -->


</head>


<body class=" login">
    <!-- BEGIN : LOGIN PAGE 5-1 -->
    <div class="user-login-5">
        <div class="row bs-reset">
            <div class="col-md-6 bs-reset">
                <div class="login-bg">
                    <img class="login-logo" src="assets/img/logohome.png" /> </div>
            </div>
            <div class="col-md-6 login-container bs-reset">
                <div class="login-content">
                    <h1>Cocoon ERP Login</h1>
                    <form method="post" name="Login_Form1" action="stLogin" class="login-form">
                        <div class="row">
                            <div class="col-xs-6">
                                <input class="form-control form-control-solid placeholder-no-fix" type="text"
                                    autocomplete="on" placeholder="Username" name="username" required autofocus="" />
                            </div>
                            <div class="col-xs-6">
                                <input class="form-control form-control-solid placeholder-no-fix" type="password"
                                    autocomplete="off" placeholder="Password" name="password" required /> </div>
                        </div>
                        <div class="alert alert-danger display-hide">
                            <button class="close" data-close="alert"></button>
                            <span>Enter any username and password. </span>
                        </div>
                        <div class="row">
<!--                            <div class="col-sm-4">
                                <div class="rem-password">
                                    <p>Remember Me
                                        <input type="checkbox" class="rem-checkbox" />
                                    </p>
                                </div>
                            </div>-->
                            <div class="col-sm-8 text-right">
<!--                                <div class="forgot-password">
                                    <a href="javascript:;" id="forget-password" class="forget-password">Forgot
                                        Password?</a>
                                </div><div style="color: red">  ${error}</div>-->
                                <button class="btn blue" name="Submit" value="Login" type="submit">Sign In</button><div style="color: red">  ${error}</div>
                            </div>
                        </div>
                    </form>
                    <!-- BEGIN FORGOT PASSWORD FORM -->
<!--                    <form class="forget-form" action="javascript:;" method="post">
                        <h3 class="font-green">Forgot Password ?</h3>
                        <p> Enter your e-mail address below to reset your password. </p>
                        <div class="form-group">
                            <input class="form-control placeholder-no-fix" type="text" autocomplete="off" placeholder="Email"
                                name="email" /> </div>
                        <div class="form-actions">
                            <button type="button" id="back-btn" class="btn grey btn-default">Back</button>
                            <button type="submit" class="btn blue btn-success uppercase pull-right">Submit</button>
                        </div>
                    </form>-->
                    <!-- END FORGOT PASSWORD FORM -->
                </div>
                <div class="login-footer">
                    <div class="row bs-reset">
                        <div class="col-xs-4 bs-reset">
                            <ul class="login-social">
                                <li>
                                    <a href="javascript:;">
                                        <i class="icon-social-facebook"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;">
                                        <i class="icon-social-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;">
                                        <i class="icon-social-dribbble"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-xs-8 bs-reset">
                            <div class="login-copyright text-right">
                                <p>Copyright &copy; FIDES 2019</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END : LOGIN PAGE 5-1 -->
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
    <!-- <script src="assets/js/layout/dashboard.min.js" type="text/javascript"></script> -->
    <!-- <script src="assets/js/global/components-select2.min.js" type="text/javascript"></script> -->
    <!-- END PAGE LEVEL PLUGINS -->

    <!-- BEGIN THEME LAYOUT SCRIPTS -->

    <script src="assets/js/global/jqueryValidation.js"></script>
    <script src="assets/js/global/additional-methods.min.js"></script>
    <script src="assets/js/global/backstretch.js"></script>
    <script src="assets/js/global/app.min.js" type="text/javascript"></script>
    <!-- END THEME LAYOUT SCRIPTS -->
    <script src="assets/js/layout/login.js" type="text/javascript"></script>
    <!-- END THEME LAYOUT SCRIPTS -->

</body>

</html>

<!-- <div class="wrapper">

        <form method="post" name="Login_Form1" action="stLogin" class="form-signin">
            <h3 class="form-signin-heading">CUCOON</h3>
    
            <hr class="colorgraph">
            <div style="color: red"> ${error}</div>
            <br></br>
    
            <input type="text" class="form-control" name="username" placeholder="Username" required="" autofocus="" />
            <br>
            <input type="password" class="form-control" name="password" placeholder="Password" required="" />
    
            <button class="btn btn-lg btn-primary btn-block" name="Submit" value="Login" type="Submit" style="background:#de995e;">Login</button>
        </form>
    </div> -->