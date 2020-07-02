
package servlets;



import com.mysql.jdbc.exceptions.MySQLIntegrityConstraintViolationException;
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
public class stFrontOffice extends HttpServlet {

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

            if(type.equalsIgnoreCase("getExistingCfc")){
            //int branch=1;//get value from session
                ps=conn.prepareStatement("select customer_master.cfc,customer_master.id,customer_master.name from customer_master inner join patient_branch on patient_branch.cfc = customer_master.cfc " +
"where patient_branch.bid = ?");
                ps.setInt(1,bid);
            rs=ps.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("id",rs.getString("id"));
            jSONObject.put("cfc",rs.getString("cfc"));
            jSONObject.put("name",rs.getString("name"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            ps.close();
        }else if(type.equalsIgnoreCase("getBookings")){
            String ttype=request.getParameter("ttype");
            
                if(ttype.equalsIgnoreCase("2")){
                cs=conn.prepareCall("call get_bookings_cc(2,?,?,?)");
                if(userType>1&&userType<7){
                cs.setInt(1,bid);
                }else{
                cs.setString(1,request.getParameter("branch"));    
                }
                cs.setString(2,request.getParameter("fromDate"));
                cs.setString(3,request.getParameter("toDate"));
//                  System.out.println(cs.toString());
                }
             
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("bookingId",rs.getString("booking_id"));
            jSONObject.put("sourceId",rs.getString("source_id"));
            jSONObject.put("cfc",rs.getString("cfc"));
            jSONObject.put("branchId",rs.getString("branch_id"));
            jSONObject.put("doctor",rs.getString("doctor"));
            jSONObject.put("doctorId",rs.getString("doctor_id"));
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
            
        } catch (SQLException |ClassNotFoundException| JSONException ex) {
                Logger.getLogger(stFrontOffice.class.getName()).log(Level.SEVERE, null, ex);
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

       if(type.equalsIgnoreCase("newPatientBooking")){
          // int bid=1;//get value from session
           String bookedBy=userName;//get value from session
            cs=conn.prepareCall("call new_patient_booking(?,?,?,?,?,?,?,?,?,?,?,?)");
            if(userType>1&userType<7){
            cs.setInt(1,bid);
            }else{
                cs.setString(1,request.getParameter("branch"));
            }
            cs.setString(2,request.getParameter("name"));
            cs.setString(3,request.getParameter("contact1"));
            cs.setString(4,request.getParameter("contact2"));
            cs.setString(5,request.getParameter("email"));
            cs.setString(6,request.getParameter("address"));
            cs.setString(7,request.getParameter("appointmentDate"));
            cs.setString(8,request.getParameter("did"));
            cs.setString(9,request.getParameter("comment"));
            cs.setString(10,bookedBy);
            cs.setString(11,request.getParameter("visit"));
            cs.setString(12,request.getParameter("source"));
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
        } else if(type.equalsIgnoreCase("existingPatientBooking")){
           //int bid=1;//get value from session
           String bookedBy=userName;//get value from session
           
            cs=conn.prepareCall("call new_booking_cfc(?,?,?,?,?,?,?)");
            cs.setString(1,request.getParameter("cfc"));
            if(userType>1&&userType<7){
            cs.setInt(2,bid);
            }else{
                cs.setString(2,request.getParameter("branch"));
            }
            cs.setString(3,request.getParameter("appointmentDate"));
            cs.setString(4,request.getParameter("did"));
            cs.setString(5,request.getParameter("comment"));
            cs.setString(6,bookedBy);
            cs.setString(7,request.getParameter("visit"));
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
        }else if(type.equalsIgnoreCase("generateCfc")){
           //int bid=1;//get value from session
           String bookedBy=userName;//get value from session
            cs=conn.prepareCall("call generate_cfc_from_reference(?,?,?)");
            
            cs.setString(1,request.getParameter("bookingId"));
            cs.setString(2,request.getParameter("did"));
            cs.setString(3,request.getParameter("visit"));
            //System.out.println(cs.toString());
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
        }else if(type.equalsIgnoreCase("toggleStatus")){
            cs=conn.prepareCall("call toggle_visit_status(?)");
            cs.setString(1,request.getParameter("bookingId"));
            int k= cs.executeUpdate();
           if(k==0){
               conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Failed");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
           }
           
            cs.close();
        }  else if(type.equalsIgnoreCase("editCfcBooking")){
          // int bid=1;//get value from session
           String bookedBy=userName;//get value from session
           
            cs=conn.prepareCall("call edit_cfc_booking(?,?,?,?,?)");
            cs.setString(1,request.getParameter("appointmentDate"));
            cs.setString(2,request.getParameter("did"));
            cs.setString(3,request.getParameter("comment"));
            cs.setString(4,bookedBy);
            cs.setString(5,request.getParameter("bookingId"));
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
        }  else if(type.equalsIgnoreCase("editRefBooking")){
           //int bid=1;//get value from session
           String bookedBy=userName;//get value from session
           
            cs=conn.prepareCall("call edit_ref_booking(?,?,?,?,?,?)");
            cs.setString(1,request.getParameter("bookingId"));
            cs.setString(2,request.getParameter("appointmentDate"));
            cs.setString(3,request.getParameter("comment"));
            cs.setString(4,bookedBy);
            cs.setString(5,request.getParameter("source"));
            cs.setString(6,request.getParameter("contact"));
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
        }else if(type.equalsIgnoreCase("deleteBooking")){
            cs=conn.prepareCall("call delete_booking_branch(?,?)");
           //System.out.println(userType);
           if(userType==3){
               conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Access Denied!");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
           }  
            
            cs.setString(2,request.getParameter("bookingId"));
            if(userType>1){
            cs.setInt(1,bid);
            }else{
                cs.setString(1,"-1");
            }
            int k= cs.executeUpdate();
           if(k==0){
               conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Failed");
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
    
        }catch(SQLException  ex){
            Logger.getLogger(stFrontOffice.class.getName()).log(Level.SEVERE, null, ex);
                response.setContentType("application/json");
//         System.out.println("sql error"+ex.getErrorCode());
            if (ex instanceof MySQLIntegrityConstraintViolationException) {
        // Duplicate entry
//         System.out.println("sql error inside if");           
                    response.getWriter().write("[{\"status\":\"0\",\"errorMessage\":\"-1\"}]");
                    }else{
                response.getWriter().write("[{\"status\":\"0\",\"errorMessage\":\" " + ex.toString() + " \"}]");
                }

        }
        catch (ClassNotFoundException| JSONException ex) {
                Logger.getLogger(stFrontOffice.class.getName()).log(Level.SEVERE, null, ex);
                response.setContentType("application/json");
                
//                if (ex instanceof MySQLIntegrityConstraintViolationException) {
//        // Duplicate entry
//                    
//                    response.getWriter().write("[{\"status\":\"0\",\"errorMessage\":\"-1\"}]");
//                    }else{
                response.getWriter().write("[{\"status\":\"0\",\"errorMessage\":\" " + ex.toString() + " \"}]");
//                }

            }
        finally{
        try {
            if(conn!=null)
            conn.close();
        } catch (SQLException ex) {
            Logger.getLogger(stFrontOffice.class.getName()).log(Level.SEVERE, null, ex);
        }
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
