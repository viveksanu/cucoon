/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author vivek
 */
public class stLogin extends HttpServlet {

 String user=Credentials.getUSER();
String pass=Credentials.getPASS();
String forName=Credentials.getForName();
String db_url=Credentials.getDB_URL();

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HttpSession session=request.getSession(true); 
          if(session != null)
          { 
              //System.out.println("---logout--- 2");
              session.invalidate(); 
          } 
       
//       System.out.println("---logout--- 3");
       response.sendRedirect("login.jsp");

    }

    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            String username=request.getParameter("username").trim();
            String passw=request.getParameter("password").trim();
            
            Class.forName(forName);
            Connection conn=DriverManager.getConnection(db_url, user, pass);
            PreparedStatement sql=conn.prepareStatement("select id, name,type,password,branch_id from user_master where name like ?");
            sql.setString(1, username);
            ResultSet rs=sql.executeQuery();
//            System.out.println(sql.toString());
            boolean flag=false;
            String userName=null;
            int branchId=-1,userId=-1,userType=-1;
            
            while (rs.next()){
                if(rs.getString("password").toString().equalsIgnoreCase(passw)){
                    userName=rs.getString("name");
                    userId=rs.getInt("id");
                    branchId=rs.getInt("branch_id");
                    userType=rs.getInt("type");
                    flag=true;
                }
            }
                if(flag){
                    HttpSession session=request.getSession(true);
                    session.setAttribute("userName", userName);
                    session.setAttribute("userId", userId);
                    session.setAttribute("branchId",branchId);
                    session.setAttribute("userType",userType);
                    switch(userType){
                        case 0:response.sendRedirect("home.jsp");break;
                        case 1:response.sendRedirect("home.jsp");break;    
                        case 2:response.sendRedirect("foBooking.jsp");break;    
                        case 3:response.sendRedirect("foBooking.jsp");break;    
                        case 4:response.sendRedirect("msa.jsp");break;        
                        case 5:response.sendRedirect("bsaPending.jsp");break;        
                        case 6:response.sendRedirect("customerCareHome.jsp");break;        
                       case 7:response.sendRedirect("foBooking.jsp");break;
                    }
                    
                }else{
                    request.setAttribute("error","Invalid Credentials");
                    request.getRequestDispatcher("login.jsp").forward(request, response);
                }
            
        } catch (ClassNotFoundException | SQLException ex) {
            Logger.getLogger(stLogin.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
