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
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Enumeration;
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
public class stCustomerCare extends HttpServlet {


    String user = Credentials.getUSER();
    String pass = Credentials.getPASS();
    String forName = Credentials.getForName();
    String db_url = Credentials.getDB_URL();
    
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
            HttpSession session=request.getSession(false);  
//             Enumeration<String> attributes = request.getSession().getAttributeNames();
//while (attributes.hasMoreElements()) {
//    String attribute = attributes.nextElement();
//    System.out.println(attribute+" : "+request.getSession().getAttribute(attribute));
//}
             int userType=(int) session.getAttribute("userType");
             userName=(String) session.getAttribute("userName");
             bid=(int) session.getAttribute("branchId");
             if(userType!=6){
                 conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Invalid Session");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
             }
        if(type.equalsIgnoreCase("getBookings")){
            String ttype=request.getParameter("ttype");
            String branchId=request.getParameter("branch");
                if(ttype.equalsIgnoreCase("1")){
                cs=conn.prepareCall("call get_bookings_cc(1,?,?,?)");
                cs.setString(1,branchId);
                cs.setString(2,request.getParameter("fromDate"));
                cs.setString(3,request.getParameter("toDate"));
                }
//                System.out.println(cs.toString());
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("bookingId",rs.getString("booking_id"));
            jSONObject.put("branchId",rs.getString("branch_id"));
            jSONObject.put("sourceId",rs.getString("source_id"));
            jSONObject.put("sourceName",rs.getString("source_name"));
            jSONObject.put("branchName",rs.getString("branch_name"));
            jSONObject.put("cfc",rs.getString("cfc"));
            jSONObject.put("branch",rs.getString("branch_name"));
            jSONObject.put("name",rs.getString("name"));
            jSONObject.put("appointment",rs.getString("appointment_time"));
            jSONObject.put("apTime",rs.getString("ap_time"));
            jSONObject.put("contact",rs.getString("contact"));
            jSONObject.put("bookedBy",rs.getString("booked_by"));
            jSONObject.put("bookingDate",rs.getString("booking_date"));
            jSONObject.put("comment",rs.getString("comment"));
            jSONObject.put("status",rs.getString("visit_status"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getPatient")){
                   cs=conn.prepareCall("call find_existing_patient_cc(?,?)");
                cs.setString(1,request.getParameter("ttype"));
                cs.setString(2,request.getParameter("keyword"));
//                System.out.println(cs.toString());
            rs=cs.executeQuery();
boolean flag=true;
            while(rs.next()){
                flag=false;
            jSONObject=new JSONObject();
            jSONObject.put("cfc",rs.getString("cfc"));
            jSONObject.put("name",rs.getString("name"));
            jSONObject.put("contact",rs.getString("contact"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            if(flag){
                jSONObject = new JSONObject();
            jSONObject.put("found", "0");
            jSONArray.put(jSONObject);
            }else{
            jSONObject = new JSONObject();
            jSONObject.put("found", "1");
            jSONArray.put(jSONObject);
            }
            rs.close();
            cs.close();
        } 
            //System.out.println(jSONArray.toString());
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            
        } catch (Exception  ex) {
                Logger.getLogger(stCustomerCare.class.getName()).log(Level.SEVERE, null, ex);
                response.setContentType("application/json");
            response.getWriter().write("[{\"status\":\"0\",\"errorMessage\":\" " + ex.toString() + " \"}]");
            }
    }

@Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
//System.out.println("asdasd");
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
            validUsers.addAll(Arrays.asList(0,1,2,3,7,6));

            HttpSession session=request.getSession(false);  
             
             int userType=(int) session.getAttribute("userType");
             userName=(String) session.getAttribute("userName");
             bid=(int) session.getAttribute("branchId");
if(validUsers.indexOf(userType)==-1){
                 conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Invalid Session");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
             }   
            String name,sex,ccid="1",contact,clinic,number,age,city,rawTime,time,comment,bookedBy;//ccid will be customer care id from session
      
        if(type.equalsIgnoreCase("newClient")){
            int refId;
         clinic=request.getParameter("clinic");
         bookedBy=userName;
        name=request.getParameter("name").trim();
//        sex=request.getParameter("sex");
        contact=request.getParameter("contact").trim();
//        city=request.getParameter("city").trim();
//        age=request.getParameter("age").trim();
       comment=request.getParameter("comment").trim();
       time=request.getParameter("appointmentDate");
            cs=conn.prepareCall("call new_booking_cc(?,?,?,?,?,?,?,?)");
            cs.setString(1,name);
            cs.setString(2,contact);
            cs.setString(3,clinic);
            cs.setString(4,time);
            cs.setString(5,bookedBy);
            cs.setString(6,comment);
            cs.setString(7,request.getParameter("source"));
            cs.registerOutParameter(8, java.sql.Types.INTEGER);

          //  ps.setString(1,request.getParameter("clientId"));
            //System.out.println(cs);
           int k= cs.executeUpdate();
           int flag=cs.getInt(8);
           if(flag==1){
               conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "-1");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
           
           }
           if(k==0){
               conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Operation failed");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
           }
           
            cs.close();
        } else if(type.equalsIgnoreCase("editRefBookingCC")){
            int refId;
         clinic=request.getParameter("clinic");
         bookedBy=userName;
        name=request.getParameter("name");
        sex=request.getParameter("sex");
        contact=request.getParameter("contact").trim();
        city=request.getParameter("city");
        age=request.getParameter("age");
       comment=request.getParameter("comment");
       time=request.getParameter("appointmentDate");
            cs=conn.prepareCall("call edit_booking_cc(?,?,?,?,?,?,?,?,?,?)");
            cs.setString(1,"1");
            cs.setString(2,name);
            cs.setString(3,contact);
            cs.setString(4,clinic);
            cs.setString(5,time);
            cs.setString(6,bookedBy);
            cs.setString(7,comment);
            cs.setString(8,request.getParameter("bookingId"));
            cs.setString(9,request.getParameter("source"));
            cs.registerOutParameter(10, java.sql.Types.INTEGER);


            int k= cs.executeUpdate();
            int flag=cs.getInt(10);
            if(flag==1){
               conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "-1");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
           
           }
           if(k==0){
               conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Operation failed");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
           }
           
            cs.close();
        }else if(type.equalsIgnoreCase("editCfcBookingCC")){
            int refId;
        comment=request.getParameter("comment");
       time=request.getParameter("appointmentDate");
            cs=conn.prepareCall("call edit_booking_cc(?,?,?,?,?,?,?,?,?,?)");
            cs.setString(1,"2");
            cs.setString(2,"");
            cs.setString(3,"");
            cs.setString(4,"-5");
            cs.setString(5,time);
            cs.setString(6,userName);
            cs.setString(7,comment);
            cs.setString(8,request.getParameter("bookingId"));
            cs.setInt(9, -1);
            cs.registerOutParameter(10, java.sql.Types.INTEGER);
          //  ps.setString(1,request.getParameter("clientId"));
            //System.out.println(cs);
           int k= cs.executeUpdate();
           if(k==0){
               conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Operation failed");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
           }
           
            cs.close();
        }else if(type.equalsIgnoreCase("existingClientCC")){
       //    int bid=1;//get value from session
         //  bookedBy="customer care @"+bid;//get value from session
           
            cs=conn.prepareCall("call new_booking_cfc(?,?,?,?,?,?,?)");
            
            cs.setString(1,request.getParameter("cfc"));
            cs.setString(2,request.getParameter("clinic"));
            cs.setString(3,request.getParameter("appointmentDate"));
            cs.setString(4,null);
            cs.setString(5,request.getParameter("comment"));
            cs.setString(6,userName);
            cs.setString(7,"0");
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
        }else if(type.equalsIgnoreCase("newSource")){
       //    int bid=1;//get value from session
         //  bookedBy="customer care @"+bid;//get value from session
           
            cs=conn.prepareCall("call customer_care_source(?,?,?)");
            
            cs.setString(1,"1");
            cs.setString(2,"-1");
            cs.setString(3,request.getParameter("name"));
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
        }else if(type.equalsIgnoreCase("editSource")){
       //    int bid=1;//get value from session
         //  bookedBy="customer care @"+bid;//get value from session
           
            cs=conn.prepareCall("call customer_care_source(?,?,?)");
            
            cs.setString(1,"2");
            cs.setString(2,request.getParameter("sourceId"));
            cs.setString(3,request.getParameter("name"));
//            System.out.println(cs.toString());
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
        }else if(type.equalsIgnoreCase("deleteSource")){
       //    int bid=1;//get value from session
         //  bookedBy="customer care @"+bid;//get value from session
           
            cs=conn.prepareCall("call customer_care_source(?,?,?)");
            
            cs.setString(1,"3");
            cs.setString(2,request.getParameter("sourceId"));
            cs.setString(3,"");
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
        } 
           
            conn.commit();
            conn.close();
            jSONObject.put("status", "1");
            jSONArray.put(jSONObject);
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
    
        } catch (SQLException |ClassNotFoundException| JSONException ex) {
                Logger.getLogger(stCustomerCare.class.getName()).log(Level.SEVERE, null, ex);
                response.setContentType("application/json");
                response.getWriter().write("[{\"status\":\"0\",\"errorMessage\":\" " + ex.toString() + " \"}]");
            }

    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
