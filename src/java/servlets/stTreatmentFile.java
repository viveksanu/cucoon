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
public class stTreatmentFile extends HttpServlet {
    
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
                // conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Invalid User");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
             }
            //int userType=1;//get value from session
            
            if(type.equalsIgnoreCase("getPatientList")){
            
            cs=conn.prepareCall("call patient_list_treatment(?)");
           // int bid=1;//get bid from session
            cs.setString(1,request.getParameter("tid"));
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
           jSONObject.put("id",rs.getString("id"));
            jSONObject.put("name",rs.getString("name"));
            jSONObject.put("sex",rs.getString("sex"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getTreatmentProcedure")){
          //  int bid=1;//get bid from session
            cs=conn.prepareCall("call get_treatment_data(?,?,?)");
            
            cs.setString(1,"1");
            cs.setInt(2,bid);
            cs.setString(3,request.getParameter("tid"));
            //System.out.println(cs.toString());
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
           jSONObject.put("id",rs.getString("id"));
            jSONObject.put("patientName",rs.getString("patient_name"));
            jSONObject.put("procedureName",rs.getString("procedure_name"));
            jSONObject.put("procedureId",rs.getString("procedure_id"));
            jSONObject.put("branchName",rs.getString("branch_name"));
            jSONObject.put("branchId",rs.getString("branch_id"));
            jSONObject.put("branchId",rs.getString("branch_id"));
            jSONObject.put("patientId",rs.getString("patient_id"));
            jSONObject.put("netAmount",rs.getString("net_amount"));
            jSONObject.put("amount",rs.getString("amount"));
            jSONObject.put("discount",rs.getString("discount"));
            jSONObject.put("isFree",rs.getString("is_free"));
            jSONObject.put("comment",rs.getString("comment"));
            jSONObject.put("startDate",rs.getString("start_date"));
            jSONObject.put("fstartDate",rs.getString("fstart_date"));
            jSONObject.put("type",rs.getString("type"));
            jSONObject.put("createdBy",rs.getString("created_by"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getBatchBasic")){
          //  int bid=1;//get bid from session
            cs=conn.prepareCall("call get_item_batch_basic(2,?)");
            cs.setInt(1,bid);
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("id",rs.getString("id"));
            jSONObject.put("itemId",rs.getString("item_id"));
            jSONObject.put("name",rs.getString("name"));
            jSONObject.put("sp",rs.getString("selling_price"));
            jSONObject.put("expiryDate",rs.getString("expiry_date"));
            jSONObject.put("msu",rs.getString("msu"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getItemDetails")){
           // int bid=1;//get bid from session
            cs=conn.prepareCall("call get_item_batch_basic(1,?)");
            cs.setInt(1,bid);
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("id",rs.getString("id"));
            
            jSONObject.put("name",rs.getString("name"));
            jSONArray.put(jSONObject);
            System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getStockDetails")){
           // int bid=1;//get bid from session
            cs=conn.prepareCall("call get_item_batch_basic(3,?)");
            cs.setInt(1,bid);
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("id",rs.getString("biid"));
            jSONObject.put("batchId",rs.getString("batch_id"));
            jSONObject.put("msu",rs.getString("msu"));
            jSONObject.put("stock",rs.getString("stock"));
            jSONObject.put("bottle",rs.getString("bottle"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getTreatmentStock")){
           // int bid=1;//get bid from session
            cs=conn.prepareCall("call get_treatment_data(?,?,?)");
            
            cs.setString(1,"2");
            cs.setInt(2,bid);
            cs.setString(3,request.getParameter("tid"));
            //System.out.println(cs.toString());
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
           jSONObject.put("id",rs.getString("id"));
            jSONObject.put("patientName",rs.getString("patient_name"));
            jSONObject.put("itemName",rs.getString("item_name"));
            jSONObject.put("itemId",rs.getString("item_id"));
            jSONObject.put("batchId",rs.getString("batch_id"));
            jSONObject.put("batchName",rs.getString("batch_name"));
            jSONObject.put("branchName",rs.getString("branch_name"));
            jSONObject.put("bottle",rs.getString("bottle"));
            jSONObject.put("patientId",rs.getString("patient_id"));
            jSONObject.put("amount",rs.getString("amount"));
            jSONObject.put("netAmount",rs.getString("net_amount"));
            jSONObject.put("quantity",rs.getString("quantity"));
            jSONObject.put("discount",rs.getString("discount"));
            jSONObject.put("isFree",rs.getString("is_free"));
            jSONObject.put("comment",rs.getString("comment"));
           jSONObject.put("startDate",rs.getString("start_date"));
            jSONObject.put("fstartDate",rs.getString("fstart_date"));
            jSONObject.put("createdBy",rs.getString("created_by"));
            jSONObject.put("type",rs.getString("type"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getDiscount")){
            //int bid=1;//get bid from session
            cs=conn.prepareCall("call get_discount(?)");
            cs.setInt(1,userType);
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("discount",rs.getString("discount"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getTreatmentLih")){
          //  int bid=1;//get bid from session
            cs=conn.prepareCall("call get_treatment_data(?,?,?)");
            
            cs.setString(1,"3");
            cs.setInt(2,bid);
            cs.setString(3,request.getParameter("tid"));
            //System.out.println(cs.toString());
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
           jSONObject.put("id",rs.getString("id"));
            jSONObject.put("patientName",rs.getString("patient_name"));
            jSONObject.put("lihName",rs.getString("lih_name"));
            jSONObject.put("lihId",rs.getString("lab_investigation_id"));
            jSONObject.put("branchName",rs.getString("branch_name"));
            jSONObject.put("branchId",rs.getString("branch_id"));
            
            jSONObject.put("patientId",rs.getString("patient_id"));
            jSONObject.put("netAmount",rs.getString("net_amount"));
            jSONObject.put("amount",rs.getString("amount"));
            jSONObject.put("discount",rs.getString("discount"));
            jSONObject.put("isFree",rs.getString("is_free"));
            jSONObject.put("comment",rs.getString("comment"));
            jSONObject.put("startDate",rs.getString("start_date"));
            jSONObject.put("fstartDate",rs.getString("fstart_date"));
            jSONObject.put("type",rs.getString("type"));
            jSONObject.put("createdBy",rs.getString("created_by"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            
        } catch (SQLException |ClassNotFoundException| JSONException ex) {
                Logger.getLogger(stTreatmentFile.class.getName()).log(Level.SEVERE, null, ex);
                response.setContentType("application/json");
            response.getWriter().write("[{\"status\":\"0\",\"errorMessage\":\" " + ex.toString() + " \"}]");
            }
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
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
             jSONObject.put("errorMessage", "Access Denied");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
             }
            
            if(type.equalsIgnoreCase("addNewProcedure")){
               
           //System.out.println("as");
         // int bid=1;//get value from session
           // String createdBy="Admin";//get value from session
            cs=conn.prepareCall("call treatment_file_add_procedure(?,?,?,?,?,?,?,?,?)");
            cs.setString(1,request.getParameter("tid"));
            cs.setString(2,request.getParameter("patient"));
            cs.setString(3,request.getParameter("procedure"));
            cs.setString(4,request.getParameter("startDate").trim());
            cs.setString(5,request.getParameter("discount").trim());
            cs.setString(6,request.getParameter("comment").trim());
            cs.setString(7,userName);
            cs.setString(8,request.getParameter("free"));
            if(userType>1 && userType <7)
            cs.setInt(9,bid);
            else
            cs.setString(9,request.getParameter("branch").trim());    
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
        }else if(type.equalsIgnoreCase("editProcedure")){
           //System.out.println("as");
          
          //  String createdBy="Admin";//get value from session
            cs=conn.prepareCall("call treatment_file_edit_procedure(?,?,?,?,?,?,?,?,?,?)");
            cs.setString(1,request.getParameter("tid"));
            cs.setString(2,request.getParameter("patient"));
            cs.setString(3,request.getParameter("procedure"));
            cs.setString(4,request.getParameter("startDate").trim());
            cs.setString(5,request.getParameter("discount").trim());
            cs.setString(6,request.getParameter("comment").trim());
            cs.setString(7,userName);
            cs.setString(8,request.getParameter("efree"));
            cs.setString(9,request.getParameter("pid"));
            if(bid>1 && bid<7){
                cs.setInt(10,bid);
            }else{
            cs.setString(10,request.getParameter("branch"));
            }
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
        }else if(type.equalsIgnoreCase("deleteTreatmentProcedure")){
           //System.out.println("as");
          
           // String createdBy="Admin";//get value from session
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
            cs=conn.prepareCall("call treatment_file_delete_procedure(?,?)");
            cs.setString(1,request.getParameter("id"));
            cs.setString(2,request.getParameter("tid"));
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
        }else if(type.equalsIgnoreCase("addNewMedicine")){
           //System.out.println("as");
         // int bid=1;//get value from session
          //  String createdBy="Admin";//get value from session
             if(userType==7){
                 conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Access Denied");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
             }
            cs=conn.prepareCall("call treatment_file_add_stock(?,?,?,?,?,?,?,?,?,?,?,?)");
            cs.setString(1,request.getParameter("tid"));
            cs.setString(2,request.getParameter("patient"));
            cs.setString(3,request.getParameter("batch"));
            cs.setString(4,request.getParameter("bottle").trim());
            cs.setString(5,request.getParameter("quantity").trim());
            cs.setString(6,request.getParameter("discount").trim());//discount
            cs.setString(7,request.getParameter("freeI"));
            cs.setString(8,request.getParameter("comment").trim());
            cs.setString(9,userName);
            cs.setInt(10,bid);
            cs.registerOutParameter(11,java.sql.Types.INTEGER);
            cs.setString(12,request.getParameter("startDate").trim());
            //System.out.println(cs);
           int k= cs.executeUpdate();
           int flag=cs.getInt(11);
           //System.out.println("flag "+flag);
           if(k==0||flag==0){
               conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Insertion failed "+flag);
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
           }
            cs.close();
        }else if(type.equalsIgnoreCase("deleteTreatmentStock")){
           //System.out.println("as");
        //  int bid=1;//get value from session
         //   String createdBy="Admin";//get value from session
             if(userType==7){
                 conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Access Denied");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
             }
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
            cs=conn.prepareCall("call treatment_file_delete_stock(?,?,?)");
            cs.setString(1,request.getParameter("id"));
            cs.setString(2,request.getParameter("tid"));
            cs.setInt(3,bid);
            //System.out.println(cs);
           int k= cs.executeUpdate();
           if(k==0){
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
        }else if(type.equalsIgnoreCase("editNewMedicine")){
           //System.out.println("as");
         // int bid=1;//get value from session
          //  String createdBy="Admin";//get value from session
             if(userType==7){
                 conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Access Denied");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
             }
            cs=conn.prepareCall("call treatment_file_edit_stock(?,?,?,?,?,?,?,?,?,?,?,?,?)");
            cs.setString(1,request.getParameter("tid"));
            cs.setString(2,request.getParameter("patient"));
            cs.setString(3,request.getParameter("batch"));
            cs.setString(4,request.getParameter("bottle").trim());
            cs.setString(5,request.getParameter("quantity").trim());
            cs.setString(6,request.getParameter("discount").trim());//discount
            cs.setString(7,request.getParameter("efreeI"));
            cs.setString(8,request.getParameter("comment").trim());
            cs.setString(9,userName);
            cs.setInt(10,bid);
            cs.registerOutParameter(11,java.sql.Types.INTEGER);
            cs.setString(12,request.getParameter("startDate").trim());
            cs.setString(13,request.getParameter("sid").trim());
            //System.out.println(cs);
           int k= cs.executeUpdate();
           int flag=cs.getInt(11);
           //System.out.println("flag "+flag);
           if(k==0||flag==0){
               if(flag==0)
                   jSONObject.put("errorMessage", "Decrease Stock");
               else
                   jSONObject.put("errorMessage", "Error");
               conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
           }
            cs.close();
        }else    if(type.equalsIgnoreCase("addNewLih")){
               
           //System.out.println("as");
         // int bid=1;//get value from session
           // String createdBy="Admin";//get value from session
            cs=conn.prepareCall("call treatment_file_add_lab(?,?,?,?,?,?,?,?,?)");
            cs.setString(1,request.getParameter("tid"));
            cs.setString(2,request.getParameter("patient"));
            cs.setString(3,request.getParameter("lih"));
            cs.setString(4,request.getParameter("startDate").trim());
            cs.setString(5,request.getParameter("discount").trim());
            cs.setString(6,request.getParameter("comment").trim());
            cs.setString(7,userName);
            cs.setString(8,request.getParameter("lihfree"));
            if(userType>1 && userType <7)
            cs.setInt(9,bid);
            else
            cs.setString(9,request.getParameter("branch").trim());    
            System.out.println(cs);
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
        }else if(type.equalsIgnoreCase("editLih")){
           //System.out.println("as");
          
          //  String createdBy="Admin";//get value from session
            cs=conn.prepareCall("call treatment_file_edit_lab(?,?,?,?,?,?,?,?,?,?)");
            cs.setString(1,request.getParameter("tid"));
            cs.setString(2,request.getParameter("patient"));
            cs.setString(3,request.getParameter("lih"));
            cs.setString(4,request.getParameter("startDate").trim());
            cs.setString(5,request.getParameter("discount").trim());
            cs.setString(6,request.getParameter("comment").trim());
            cs.setString(7,userName);
            cs.setString(8,request.getParameter("elihfree"));
            cs.setString(9,request.getParameter("pid"));
            if(bid>1 && bid<7){
                cs.setInt(10,bid);
            }else{
            cs.setString(10,request.getParameter("branch"));
            }
            System.out.println(cs);
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
        }else if(type.equalsIgnoreCase("deleteTreatmentLih")){
           //System.out.println("as");
          
           // String createdBy="Admin";//get value from session
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
            cs=conn.prepareCall("call treatment_file_delete_lab(?,?)");
            cs.setString(1,request.getParameter("id"));
            cs.setString(2,request.getParameter("tid"));
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
        }
            
            conn.commit();
            conn.close();
            jSONObject.put("status", "1");
            jSONArray.put(jSONObject);
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
    
        } catch (SQLException |ClassNotFoundException| JSONException ex) {
                Logger.getLogger(stTreatmentFile.class.getName()).log(Level.SEVERE, null, ex);
                response.setContentType("application/json");
                response.getWriter().write("[{\"status\":\"0\",\"errorMessage\":\" " + ex.toString() + " \"}]");
            }
    }
    @Override
    public String getServletInfo() {
        return "Short description";
    }


}
