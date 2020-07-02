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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author vivek
 */
public class stDoctor extends HttpServlet {

    String user = Credentials.getUSER();
    String pass = Credentials.getPASS();
    String forName = Credentials.getForName();
    String db_url = Credentials.getDB_URL();

    
        @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        JSONArray jSONArray = null;
        JSONObject jSONObject;
        Connection conn = null;
        PreparedStatement ps = null;
        CallableStatement cs = null;
        ResultSet rs = null;
        String type;
        type = request.getParameter("type");
        try {
            Class.forName(forName);
            conn = DriverManager.getConnection(db_url, user, pass);
            conn.setAutoCommit(false);
            jSONArray = new JSONArray();
            jSONObject = new JSONObject();
            jSONObject.put("status", "1");
            jSONArray.put(jSONObject);
            
            String userName;
            int bid;
            ArrayList<Integer>validUsers=new ArrayList<Integer>();
            validUsers.addAll(Arrays.asList(0,1,2,3,7));

            HttpSession session=request.getSession(false);  
             int userType=(int) session.getAttribute("userType");
             userName=(String) session.getAttribute("userName");
             bid=(int) session.getAttribute("branchId");
             if(validUsers.indexOf(userType)==-1){
                 conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Invalid User");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
             }
             
            if(type.equalsIgnoreCase("getBranchDoctor")){
            
                cs=conn.prepareCall("call get_doctor_branch(?)");
                //get session value
                cs.setInt(1,bid);
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("doctorId",rs.getString("id"));
            jSONObject.put("doctorName",rs.getString("name"));
            jSONObject.put("contact",rs.getString("contact"));
            jSONObject.put("dob",rs.getString("dob"));
            jSONObject.put("edob",rs.getString("edob"));
            jSONObject.put("sex",rs.getString("sex"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        } else if(type.equalsIgnoreCase("getAllDoctorBasic")){
            
                cs=conn.prepareCall("call get_all_doctor_basic(?)");
                cs.setInt(1,bid);
//get values from session 
                //get session value
                
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("doctorId",rs.getString("id"));
            jSONObject.put("doctorName",rs.getString("name"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getAllDoctorBasicAdmin")){
                cs=conn.prepareCall("call get_all_doctor_basic_admin()");
            
//get values from session 
                //get session value
                
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("doctorId",rs.getString("id"));
            jSONObject.put("doctorName",rs.getString("name"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getDoctorBranch")){
            cs=conn.prepareCall("call get_doctor_branch_admin(?)");   
            if(userType>1 && userType<7){
            cs.setInt(1,bid);
            }else{
            cs.setInt(1,-1);
            }
                
                
//get values from session 
                //get session value
                
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("doctorId",rs.getString("did"));
            jSONObject.put("branchId",rs.getString("bid"));
            jSONObject.put("doctorName",rs.getString("dname"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getAllDoctor")){
            if(validUsers.indexOf(userType)>1){
                 conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Invalid User");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
             }
                cs=conn.prepareCall("call get_doctor_all()");
                //get session value
                //cs.setInt(1,bid);
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("doctorId",rs.getString("id"));
            jSONObject.put("doctorName",rs.getString("name"));
            jSONObject.put("contact",rs.getString("contact"));
            jSONObject.put("dob",rs.getString("dob"));
            jSONObject.put("fdob",rs.getString("fdob"));
            jSONObject.put("sex",rs.getString("sex"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        } 
          //  System.out.println(jSONArray.toString());
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            
        } catch (SQLException |ClassNotFoundException| JSONException ex) {
                Logger.getLogger(stDoctor.class.getName()).log(Level.SEVERE, null, ex);
                response.setContentType("application/json");
            response.getWriter().write("[{\"status\":\"0\",\"errorMessage\":\" " + ex.toString() + " \"}]");
            }
    }
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
 
 
 JSONArray jSONArray = null;
        JSONObject jSONObject;
        Connection conn = null;
        PreparedStatement ps = null;
        CallableStatement cs = null;
        ResultSet rs = null;
        String type;
        type = request.getParameter("type");
        try {
            Class.forName(forName);
            conn = DriverManager.getConnection(db_url, user, pass);
            conn.setAutoCommit(false);
            
            jSONArray = new JSONArray();
            jSONObject = new JSONObject();
            jSONObject.put("status", "1");
            jSONArray.put(jSONObject);
            String userName;
            int bid;
            ArrayList<Integer>validUsers=new ArrayList<Integer>();
            validUsers.addAll(Arrays.asList(0,1,2));

            HttpSession session=request.getSession(false);  
             int userType=(int) session.getAttribute("userType");
             userName=(String) session.getAttribute("userName");
             bid=(int) session.getAttribute("branchId");
             if(validUsers.indexOf(userType)==-1){
                 conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Invalid User");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
             }
       if(type.equalsIgnoreCase("newDoctor")){
           String date=null;
           date=request.getParameter("dob");
           if(date.length()!=10){
           date=null;}
        //System.out.println(request.getParameter("name"));
            cs=conn.prepareCall("call new_doctor(0,?,?,?,?,?,?)");
            cs.setString(1,request.getParameter("name"));
            cs.setString(2,date);
            cs.setString(3,request.getParameter("sex"));
            cs.setString(4,request.getParameter("contact"));
       //     int bid=1;
            cs.setString(5,request.getParameter("branchId"));//set session value
            cs.setString(6,request.getParameter("username"));
            //System.out.println(ps);
           int k= cs.executeUpdate();
           if(k==0){
               conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Insertion failed");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
           }
            cs.close();
        }else if(type.equalsIgnoreCase("removeBranchDoctor")){
                  ps=conn.prepareStatement("delete from doctor_branch where did =? and bid = ?");
                //get session value
                ps.setString(1,request.getParameter("id"));
                ps.setInt(2,bid);
            
           int k= ps.executeUpdate();
           if(k==0){
               conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Removal failed");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
           }
            ps.close();
        }else if(type.equalsIgnoreCase("addDoctorToBranch")){
           
        //System.out.println(request.getParameter("name"));
            cs=conn.prepareCall("call assign_doctor_branch(?,?)");
            //int bid=1;
            cs.setString(1,request.getParameter("did"));
            cs.setInt(2,bid);//set session value
            //System.out.println(ps);
           int k= cs.executeUpdate();
           if(k==0){
               conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Insertion failed");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
           }
            cs.close();
        }else if(type.equalsIgnoreCase("editDoctor")){
           String date=null;
           date=request.getParameter("dob");
           if(date.length()!=10){
           date=null;}
        //System.out.println(request.getParameter("name"));
            cs=conn.prepareCall("call edit_doctor_branch(?,?,?,?,?,?)");
            cs.setString(1,request.getParameter("name"));
            cs.setString(2,date);
            cs.setString(3,request.getParameter("sex"));
            cs.setString(4,request.getParameter("contact"));
            //int bid=1;
            cs.setInt(5,bid);//set session value
            cs.setString(6,request.getParameter("did"));
            //System.out.println(ps);
           int k= cs.executeUpdate();
           if(k==0){
               conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Updation failed");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
           }
            cs.close();
        }else if(type.equalsIgnoreCase("editDoctorAdmin")){
           String date=null;
           date=request.getParameter("dob");
           if(date.length()!=10){
           date=null;}
        //System.out.println(request.getParameter("name"));
            cs=conn.prepareCall("call edit_doctor_admin(?,?,?,?,?)");
            cs.setString(1,request.getParameter("name"));
            cs.setString(2,date);
            cs.setString(3,request.getParameter("sex"));
            cs.setString(4,request.getParameter("contact"));
            //int bid=1;
            
            cs.setString(5,request.getParameter("did"));
            //System.out.println(ps);
           int k= cs.executeUpdate();
           if(k==0){
               conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Updation failed");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
           }
            cs.close();
        }else if(type.equalsIgnoreCase("deleteDoctor")){
                  ps=conn.prepareStatement("update doctor_master set isactive=0 where id =? ");
                //get session value
                ps.setString(1,request.getParameter("id"));
                
            
           int k= ps.executeUpdate();
           if(k==0){
               conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Removal failed");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
           }
            ps.close();
        }
           
            conn.commit();
            conn.close();
            jSONObject.put("status", "1");
            jSONArray.put(jSONObject);
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
    
        }
 catch (SQLException |ClassNotFoundException| JSONException ex) {
                Logger.getLogger(stDoctor.class.getName()).log(Level.SEVERE, null, ex);
                response.setContentType("application/json");
                response.getWriter().write("[{\"status\":\"0\",\"errorMessage\":\" " + ex.toString() + " \"}]");
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
