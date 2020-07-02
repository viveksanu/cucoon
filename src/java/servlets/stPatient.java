/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
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
public class stPatient extends HttpServlet {

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
            validUsers.addAll(Arrays.asList(0,1,2,3,6,7));

            HttpSession session=request.getSession(false);  
             int userType=(int) session.getAttribute("userType");
             int userId=(int) session.getAttribute("userId");
             userName=(String) session.getAttribute("userName");
             bid=(int) session.getAttribute("branchId");
             if(validUsers.indexOf(userType)==-1){
//                 conn.rollback();
//                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Invalid User");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
             }
            
        if(type.equalsIgnoreCase("getPatientInfoBasic")){
            
            cs=conn.prepareCall("call get_patient_info_basic(?,?,?)");
           // int bid=1;//get bid from session
            cs.setString(1, "1");
            cs.setString(2,request.getParameter("cfc"));
            cs.setInt(3,bid);
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
            if(rs.getString("sex").equalsIgnoreCase("female")){
            jSONObject.put("cfc",rs.getString("cfc")+"F");
            jSONObject.put("sex","F");
            }else if (rs.getString("sex").equalsIgnoreCase("male")){
            jSONObject.put("cfc",rs.getString("cfc")+"M");
            jSONObject.put("sex","M");
            }
            jSONObject.put("id",rs.getString("id"));
            jSONObject.put("dob",rs.getString("dob"));
            jSONObject.put("dobf",rs.getString("dobf"));
            jSONObject.put("name",rs.getString("name"));
            
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getUpdatedCfc")){
            
            cs=conn.prepareCall("call get_patient_info_basic(?,?,?)");
           // int bid=1;//get bid from session
            cs.setString(1, "2");
            cs.setString(2,"0");//irrelevant
            cs.setInt(3,bid);
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
           jSONObject.put("id",rs.getString("id"));
            jSONObject.put("cfc",rs.getString("cfc"));
            jSONObject.put("mcfc",rs.getString("mcfc"));
            jSONObject.put("name",rs.getString("name"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getTreatmentFiles")){
            
            cs=conn.prepareCall("call get_treatment_files(?)");
         //   int bid=1;//get bid from session
            cs.setString(1,request.getParameter("cfc"));//get cfc from session
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("id",rs.getString("id"));
            jSONObject.put("name",rs.getString("name"));
            jSONObject.put("patientName",rs.getString("pname"));
            jSONObject.put("doctorName",rs.getString("doctor_name"));
            jSONObject.put("doctorId",rs.getString("doctor_id"));
            jSONObject.put("patientId",rs.getString("patient_id"));
            jSONObject.put("startDate",rs.getString("start_date"));
            jSONObject.put("sDate",rs.getString("sdate"));
            jSONObject.put("pDate",rs.getString("pdate"));
            jSONObject.put("dueDate",rs.getString("payment_date"));
            jSONObject.put("totalAmount",rs.getString("total_amount"));
            jSONObject.put("receivedAmount",rs.getString("ramount"));
            jSONObject.put("balanceAmount",rs.getString("balance_amount"));
            jSONObject.put("comment",rs.getString("comment"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getTreatmentDoctor")){
            
            cs=conn.prepareCall("call get_treatment_doctor(?)");
         //   int bid=1;//get bid from session
            cs.setString(1,request.getParameter("cfc"));//get cfc from session
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("id",rs.getString("id"));
            jSONObject.put("name",rs.getString("name"));

            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getPatientMasterAll")){
            
            String cfc=request.getParameter("cfc").trim();
            String name=request.getParameter("name").trim();
            String number1=request.getParameter("number").trim();
            
            if(number1.length()+name.length()+cfc.length()==0){
            name="";
            number1="";
            cfc="";
            }else{
                cfc="%"+cfc+"%";
                name="%"+name+"%";
                number1="%"+number1+"%";
//            if(cfc.length()==0){
//            cfc="%"+cfc+"%";
//            }
//            if(name.length()==0){
//            name="%"+name+"%";
//            }
//            if(number1.length()==0){
//            number1="%"+number1+"%";
//            }
            }
            
            cs=conn.prepareCall("call get_patient_master_search(?,?,?,?,?)");
           
             if(userType==7){
            cs.setInt(1, userId);
            }else{
                 cs.setInt(1, bid);
            }
            cs.setInt(2,userType);
            cs.setString(3, cfc);
            cs.setString(4, name);
            cs.setString(5,number1);
//            System.out.println(cs.toString());
//           System.out.println(cs.toString());
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
           jSONObject.put("id",rs.getString("id"));
            jSONObject.put("cfc",rs.getString("cfc"));
            jSONObject.put("number1",rs.getString("number1"));
            jSONObject.put("number2",rs.getString("number2"));
            jSONObject.put("name",rs.getString("name"));
            jSONObject.put("email",rs.getString("email"));
            jSONObject.put("address",rs.getString("address"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getPatientBranch")){
            
            cs=conn.prepareCall("call get_patient_branch(?,1)");
         //   int bid=1;//get bid from session
            cs.setString(1,request.getParameter("cfc"));//get cfc from session
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("id",rs.getString("id"));
            jSONObject.put("name",rs.getString("branch_name"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getPatientRemainingBranch")){
            
            cs=conn.prepareCall("call get_patient_branch(?,2)");
         //   int bid=1;//get bid from session
            cs.setString(1,request.getParameter("cfc"));//get cfc from session
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("id",rs.getString("id"));
            jSONObject.put("name",rs.getString("branch_name"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }
        else if(type.equalsIgnoreCase("getPatientBasicInfo")){
            
            cs=conn.prepareCall("call get_patient_info_basic(3,?,-1)");
           // int bid=1;//get bid from session
            cs.setString(1,request.getParameter("cfc").trim() );
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
           jSONObject.put("id",rs.getString("id"));
            jSONObject.put("cfc",rs.getString("cfc"));
            jSONObject.put("number1",rs.getString("number1"));
            jSONObject.put("number2",rs.getString("number2"));
            jSONObject.put("name",rs.getString("name"));
            jSONObject.put("sourceName",rs.getString("source_name"));
            jSONObject.put("sourceId",rs.getString("customer_source"));
            jSONObject.put("email",rs.getString("email"));
            jSONObject.put("address",rs.getString("address"));
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
                Logger.getLogger(stPatient.class.getName()).log(Level.SEVERE, null, ex);
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

       if(type.equalsIgnoreCase("addInfo")){
           //System.out.println("as");
        String sex=null;
        sex=request.getParameter("sex");
        if(sex.equalsIgnoreCase("male")==false&&sex.equalsIgnoreCase("female")==false)
            sex=null;
            cs=conn.prepareCall("call add_patient_basic_info(?,?,?,?,?)");
            cs.setString(1,"1");
            cs.setString(2,request.getParameter("cfc"));
            cs.setString(3,request.getParameter("name"));
            cs.setString(4,sex);
            cs.setString(5,request.getParameter("dob"));
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
        }else if(type.equalsIgnoreCase("editInfo")){
           //System.out.println("edit");
        String sex=null;
        sex=request.getParameter("sex");
        if(sex.equalsIgnoreCase("male")==false&&sex.equalsIgnoreCase("female")==false)
            sex=null;
            cs=conn.prepareCall("call add_patient_basic_info(?,?,?,?,?)");
            cs.setString(1,"2");
            cs.setString(2,request.getParameter("cfc"));
            cs.setString(3,request.getParameter("name"));
            cs.setString(4,sex);
            cs.setString(5,request.getParameter("dob"));
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
        }else if(type.equalsIgnoreCase("newTreatment")){
           //System.out.println("as");
            String createdBy=userName;//get value from session
            cs=conn.prepareCall("call new_treatment_file(?,?,?,?,?,?,?,?)");
            cs.setString(1,request.getParameter("name").trim());
            cs.setString(2,request.getParameter("cfc"));
            cs.setString(3,request.getParameter("startDate").trim());
            cs.setString(4,request.getParameter("dueDate").trim());
            cs.setString(5,request.getParameter("comment").trim());
            cs.setString(6,createdBy);
            cs.setString(7,request.getParameter("doctor"));
            cs.setString(8,request.getParameter("patient"));
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
        }else if(type.equalsIgnoreCase("editTreatment")){
           //System.out.println("as");
            String createdBy=userName;//get value from session
            cs=conn.prepareCall("call edit_treatment_file(?,?,?,?,?,?,?,?,?)");
            cs.setString(1,request.getParameter("name").trim());
            cs.setString(2,request.getParameter("cfc"));
            cs.setString(3,request.getParameter("startDate").trim());
            cs.setString(4,request.getParameter("dueDate").trim());
            cs.setString(5,request.getParameter("comment").trim());
            cs.setString(6,createdBy);
            cs.setString(7,request.getParameter("tid"));
            cs.setString(8,request.getParameter("doctor"));
            cs.setString(9,request.getParameter("patient"));
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
        }else if(type.equalsIgnoreCase("deleteTreatmentFile")){
           //System.out.println("as");
            //String createdBy="Admin";//get value from session verify delete only admin,branch has access
            if(userType>2){
               conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Access Denied");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
           }
            cs=conn.prepareCall("call delete_treatment_file(?,?)");
            cs.setString(1,request.getParameter("id").trim());
            cs.setString(2,request.getParameter("cfc").trim());//get value from session
           // System.out.println(cs);
           int k= cs.executeUpdate();
           if(k==0){
               conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Transaction failed");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
           }
            cs.close();
        }else if(type.equalsIgnoreCase("deletePatient")){
           //System.out.println("as");
            //String createdBy="Admin";//get value from session verify delete only admin,branch has access
            if(userType>2){
               conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Access Denied");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
           }
            cs=conn.prepareCall("call delete_patient(?,?,?)");
            cs.setString(1,request.getParameter("cfc").trim());
            cs.setInt(2,bid);//get value from session
            cs.setInt(3,userType);
           // System.out.println(cs);
           int k= cs.executeUpdate();
           if(k==0){
               conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Transaction failed");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
           }
            cs.close();
        }else if(type.equalsIgnoreCase("editPatientMaster")){
           //System.out.println("as");
            //String createdBy="Admin";//get value from session verify delete only admin,branch has access
            
            cs=conn.prepareCall("call edit_patient_master(?,?,?,?,?,?,?,?,?)");
            cs.setInt(1,userType);
            cs.setInt(2,bid);//get value from session
            cs.setString(3,request.getParameter("cfc").trim());
            cs.setString(4,request.getParameter("name"));
            cs.setString(5,request.getParameter("contact1"));
            cs.setString(6,request.getParameter("contact2"));
            cs.setString(7,request.getParameter("email"));
            cs.setString(8,request.getParameter("address"));
            cs.setString(9,request.getParameter("source"));
            
           // System.out.println(cs);
           int k= cs.executeUpdate();
           if(k==0){
               conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Transaction failed");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
           }
            cs.close();
        }else if(type.equalsIgnoreCase("newBranchAccess")){
           //System.out.println("as");
            //String createdBy="Admin";//get value from session verify delete only admin,branch has access
            if(userType>2){
               conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Access Denied");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
           }
            cs=conn.prepareCall("call assign_patient_branch(?,?)");
            cs.setString(1,request.getParameter("branch"));
            cs.setString(2,request.getParameter("cfc").trim());//get value from session
//            System.out.println(cs);
           int k= cs.executeUpdate();
           if(k==0){
               conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Transaction failed");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
           }
            cs.close();
        }else if(type.equalsIgnoreCase("deleteBranchAccess")){
           //System.out.println("as");
            //String createdBy="Admin";//get value from session verify delete only admin,branch has access
            if(userType>1){
               conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Access Denied");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
           }
            ps=conn.prepareStatement("delete from patient_branch where id = ?;");
            ps.setString(1,request.getParameter("id"));
            
            //System.out.println(cs);
           int k= ps.executeUpdate();
           if(k==0){
               conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Transaction failed");
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
    
        } catch(SQLException  ex){
//            System.out.println("------------------sql error"+ex.getErrorCode());
            Logger.getLogger(stPatient.class.getName()).log(Level.SEVERE, null, ex);
                response.setContentType("application/json");
//         System.out.println("sql error"+ex.getErrorCode());
            if (ex instanceof MySQLIntegrityConstraintViolationException) {
        // Duplicate entry
//         System.out.println("sql error inside if");           
                    response.getWriter().write("[{\"status\":\"0\",\"errorMessage\":\"-1\"}]");
                    }else{
                response.getWriter().write("[{\"status\":\"0\",\"errorMessage\":\" " + ex.toString() + " \"}]");
                }

        }catch (ClassNotFoundException| JSONException ex) {
                Logger.getLogger(stPatient.class.getName()).log(Level.SEVERE, null, ex);
                response.setContentType("application/json");
                response.getWriter().write("[{\"status\":\"0\",\"errorMessage\":\" " + ex.toString() + " \"}]");
            }
        finally{
        try {
            if(conn!=null)
            conn.close();
        } catch (SQLException ex) {
            Logger.getLogger(stPatient.class.getName()).log(Level.SEVERE, null, ex);
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
