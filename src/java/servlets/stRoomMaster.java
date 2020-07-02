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
import javax.servlet.annotation.WebServlet;
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
@WebServlet(name = "stRoomMaster", urlPatterns = {"/stRoomMaster"})
public class stRoomMaster extends HttpServlet {

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
	
        if(type.equalsIgnoreCase("getRooms")){
           // int bid=1;//get value from session
                cs=conn.prepareCall("call get_room_detail(?)");
                if(userType>1 && userType<7){
                cs.setInt(1,bid);
                }else{
                    cs.setInt(1,-1);
                }
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("id",rs.getString("id"));
            jSONObject.put("branchId",rs.getString("branch_id"));
            jSONObject.put("name",rs.getString("name"));
            jSONObject.put("type",rs.getString("type"));
            jSONObject.put("rtype",rs.getString("rtype"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getRoomBookings")){
           // int bid=1;//get value from session
                cs=conn.prepareCall("call get_room_booking(?,?,?)");
                if(userType>1 && userType<7){
                cs.setInt(1,bid);
                }else{
                    cs.setString(1,request.getParameter("branch"));
                }
                cs.setString(2,request.getParameter("fromDate"));
                cs.setString(3,request.getParameter("toDate"));
                
                rs=cs.executeQuery();
            //    System.out.println(cs.toString());
            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("id",rs.getString("id"));
            jSONObject.put("roomName",rs.getString("rname"));
            jSONObject.put("patientName",rs.getString("pname"));
            jSONObject.put("doctorName",rs.getString("dname"));
            jSONObject.put("cfc",rs.getString("mcfc"));
            jSONObject.put("startTime",rs.getString("book_start"));
            jSONObject.put("stopTime",rs.getString("book_end"));
            jSONObject.put("mstartTime",rs.getString("mstart"));
            jSONObject.put("mstopTime",rs.getString("mend"));
            jSONObject.put("comment",rs.getString("comment"));
            jSONObject.put("roomId",rs.getString("room_id"));
            jSONObject.put("bookedBy",rs.getString("booked_by"));
            jSONObject.put("patientId",rs.getString("patient_id"));
            jSONObject.put("doctorId",rs.getString("doctor_id"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getPatient")){
           // int bid=1;//get value from session
                cs=conn.prepareCall("call get_patient_room_booking(?) ");
                cs.setString(1,request.getParameter("cfc"));
            rs=cs.executeQuery();
int k=0;
            while(rs.next()){
                k=1;
            jSONObject=new JSONObject();
            jSONObject.put("found",1);
            jSONObject.put("id",rs.getString("id"));
            jSONObject.put("name",rs.getString("name"));
            jSONObject.put("sex",rs.getString("sex"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            if(k==0){
            jSONObject=new JSONObject();
            jSONObject.put("found",0);
            jSONArray.put(jSONObject);
            
            }
            rs.close();
            cs.close();
        } 
            //System.out.println(jSONArray.toString());
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            
        } catch (SQLException |ClassNotFoundException| JSONException ex) {
                Logger.getLogger(stRoomMaster.class.getName()).log(Level.SEVERE, null, ex);
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
       if(type.equalsIgnoreCase("newRoom")){
           if(userType==3||userType==7){
               conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Access Denied");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
           }
        //int bid=1;//get value from session
            cs=conn.prepareCall("call room_master(1,?,?,?,?)");
            cs.setString(1,request.getParameter("roomType"));
            cs.setString(2,request.getParameter("name"));
            cs.setInt(3,bid);
            cs.setInt(4,0);
            //System.out.println(cs);
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
        }else if(type.equalsIgnoreCase("editRoom")){
      //  int bid=1;//get value from session
            if(userType==3||userType==7){
               conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Access Denied");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
           }
            cs=conn.prepareCall("call room_master(2,?,?,?,?)");
            cs.setString(1,request.getParameter("roomType"));
            cs.setString(2,request.getParameter("name"));
            if(userType>1){
            cs.setInt(3,bid);
            }else{
                cs.setInt(3,-1);
            }
            cs.setString(4,request.getParameter("roomId"));
            
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
        }else if(type.equalsIgnoreCase("deleteRoom")){
       // int bid=1;//get value from session
            if(userType==3||userType==7){
               conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Access Denied");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
           }
            cs=conn.prepareCall("call room_master(3,?,?,?,?)");
            cs.setString(1,"0");
            cs.setString(2,"0");
            cs.setInt(3,bid);
            cs.setString(4,request.getParameter("roomId"));
            //System.out.println(cs);
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
        }else if(type.equalsIgnoreCase("newRoomBooking")){
       // int bid=1;//get value from session
            cs=conn.prepareCall("call room_booking(?,?,?,?,?,?,?,?,?,?,?)");
            cs.setString(1,"1");
            if(userType>1&&userType<7){
            cs.setInt(2,bid);
            }else{
            cs.setInt(2,-1);
            }
            cs.setString(3,request.getParameter("rid"));
            cs.setString(4,request.getParameter("pid"));
            cs.setString(5,request.getParameter("did"));
            cs.setString(6,request.getParameter("appointmentStart"));
            cs.setString(7,request.getParameter("appointmentStop"));
            cs.setString(8,request.getParameter("comment"));
            cs.setString(9,userName);//get value from session
            cs.registerOutParameter(10, java.sql.Types.INTEGER);
            cs.setString(11,"0");//irrelevant
//            System.out.println(cs);
           cs.executeUpdate();
           int k = cs.getInt(10);

           if(k==-1){
               conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Insertion failed");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
           }else if(k==0){
              conn.rollback();
                 conn.close();
             
               jSONObject.put("status", "2");
             jSONObject.put("errorMessage", "Room is already booked!");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
           
           }
            cs.close();
        }
            else if(type.equalsIgnoreCase("editRoomBooking")){
       // int bid=1;//get value from session
            cs=conn.prepareCall("call room_booking(?,?,?,?,?,?,?,?,?,?,?)");
            cs.setString(1,"2");//type edit
            if(userType>1){
            cs.setInt(2,bid);
            }else {
                cs.setInt(2,-1);
            }
            cs.setString(3,request.getParameter("rid"));
            cs.setString(4,request.getParameter("pid"));
            cs.setString(5,request.getParameter("did"));
            cs.setString(6,request.getParameter("appointmentStart"));
            cs.setString(7,request.getParameter("appointmentStop"));
            cs.setString(8,request.getParameter("comment"));
            cs.setString(9,userName);//get value from session
            cs.registerOutParameter(10, java.sql.Types.INTEGER);
            cs.setString(11,request.getParameter("bookingId"));//irrelevant
            //System.out.println(cs);
           cs.executeUpdate();
           int k = cs.getInt(10);

           if(k==-1){
               conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Insertion failed");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
           }else if(k==0){
              conn.rollback();
                 conn.close();
             
               jSONObject.put("status", "2");
            jSONObject.put("errorMessage", "Room is already booked!");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
           
           }
            cs.close();
        }
         else if(type.equalsIgnoreCase("deleteRoomBooking")){
      //  int bid=1;//get value from session
             if(userType==3||userType==7){
               conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Access Denied");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
           }
            cs=conn.prepareCall("call delete_room_booking(?,?)");
            cs.setString(1,request.getParameter("bookingId"));
            cs.setInt(2,bid);
           
            int k = cs.executeUpdate();
//System.out.println("========"+k);
           if(k==-1){
               conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Deletion failed");
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
                Logger.getLogger(stRoomMaster.class.getName()).log(Level.SEVERE, null, ex);
                response.setContentType("application/json");
                response.getWriter().write("[{\"status\":\"0\",\"errorMessage\":\" " + ex.toString() + " \"}]");
            }
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
