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
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


/**
 *
 * @author vivek
 */
public class stPayment extends HttpServlet {
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
            HttpSession session=request.getSession(false);  
             int userType=(int) session.getAttribute("userType");
             userName=(String) session.getAttribute("userName");
             bid=(int) session.getAttribute("branchId");
             if(userType>3){
                 conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Invalid Session");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
             }
        if(type.equalsIgnoreCase("getBasic")){
            
                cs=conn.prepareCall("call get_basic_generate_receipt(?)");
                cs.setString(1,request.getParameter("tid"));
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("name",rs.getString("name"));
            jSONObject.put("totalAmount",rs.getString("total_amount"));
            jSONObject.put("receivedAmount",rs.getString("ramount"));
            jSONObject.put("balanceAmount",rs.getString("balance_amount"));
            jSONObject.put("invoiceFlag",rs.getString("invoice_flag"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getReceipts")){
            
                cs=conn.prepareCall("call get_treatment_receipt(?)");
                cs.setString(1,request.getParameter("tid"));
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("id",rs.getString("id"));
            jSONObject.put("receiptNumber",rs.getString("receipt_num"));
            jSONObject.put("name",rs.getString("name"));
            jSONObject.put("billDate",rs.getString("bill_date"));
            jSONObject.put("fdate",rs.getString("fdate"));
            jSONObject.put("amount",rs.getString("amount"));
            jSONObject.put("mode",rs.getString("payment_mode"));
            jSONObject.put("description",rs.getString("description"));
            jSONObject.put("createdBy",rs.getString("created_by"));
            jSONObject.put("branchName",rs.getString("branch_name"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getInvoiceReceipt")){
            
                cs=conn.prepareCall("call get_invoice_receipt(?,?)");
                cs.setString(1,request.getParameter("tid"));
                cs.setString(2,request.getParameter("id"));
                System.out.println(cs.toString());
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("id",rs.getString("id"));
            jSONObject.put("receiptNumber",rs.getString("receipt_num"));
            jSONObject.put("name",rs.getString("name"));
            jSONObject.put("billDate",rs.getString("bill_date"));
            jSONObject.put("fdate",rs.getString("fdate"));
            jSONObject.put("amount",rs.getString("amount"));
            jSONObject.put("mode",rs.getString("payment_mode"));
            jSONObject.put("description",rs.getString("description"));
            jSONObject.put("createdBy",rs.getString("created_by"));
            jSONObject.put("branchName",rs.getString("branch_name"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getFullInvoice")){
            
                cs=conn.prepareCall("call get_invoice_treatment(?)");
                cs.setString(1,request.getParameter("id"));
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
            
            jSONObject.put("invoiceNumber",rs.getString("invoice_num"));
            jSONObject.put("patientName",rs.getString("customer_name"));
            jSONObject.put("billDate",rs.getString("invoice_date"));
            
            jSONObject.put("amount",rs.getString("amount"));
            jSONObject.put("mode",rs.getString("payment_mode"));
            jSONObject.put("description",rs.getString("description"));
            jSONObject.put("createdBy",rs.getString("created_by"));
            jSONObject.put("branchName",rs.getString("branch_name"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getReceiptPrint")){
            
                ps=conn.prepareStatement("select doctor_master.name doctor_name,patient_info_master.sex gender, patient_info_master.name patient_name,receipt_master.receipt_num bill,receipt_master.amount,date_format(receipt_master.bill_date,'%d/%m/%Y')bill_date,receipt_master.payment_mode,treatment_master.cfc , " +
"branch_master.name branch_name,receipt_master.description " +
"from receipt_master inner join treatment_master on treatment_master.id = receipt_master.tid inner join doctor_master on doctor_master.id = treatment_master.doctor_id " +
"inner join patient_info_master on patient_info_master.id = treatment_master.patient_id inner join branch_master on branch_master.id = receipt_master.bid  " +
"where receipt_master.id= ?;");
                ps.setString(1,request.getParameter("rid"));
            rs=ps.executeQuery();
//System.out.println(ps);
            while(rs.next()){
            jSONObject=new JSONObject();
            
            jSONObject.put("bill",rs.getString("bill"));
            jSONObject.put("patientName",rs.getString("patient_name"));
            jSONObject.put("doctorName",rs.getString("doctor_name"));
            jSONObject.put("gender",rs.getString("gender"));
            jSONObject.put("billDate",rs.getString("bill_date"));
            
            jSONObject.put("amount",rs.getString("amount"));
            jSONObject.put("mode",rs.getString("payment_mode"));
            jSONObject.put("description",rs.getString("description"));
            jSONObject.put("cfc",rs.getString("cfc"));
            jSONObject.put("branchName",rs.getString("branch_name"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            ps.close();
        } 
            //System.out.println(jSONArray.toString());
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            
        } catch (SQLException |ClassNotFoundException| JSONException ex) {
                Logger.getLogger(stPayment.class.getName()).log(Level.SEVERE, null, ex);
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
            HttpSession session=request.getSession(false);  
             int userType=(int) session.getAttribute("userType");
             userName=(String) session.getAttribute("userName");
             bid=(int) session.getAttribute("branchId");
             if(userType>3){
                 conn.rollback();
                 conn.close();
             jSONObject.put("status", "0");
             jSONObject.put("errorMessage", "Invalid Session");
            jSONArray.put(jSONObject);
            
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            return;
             }
            
       if(type.equalsIgnoreCase("addNewReceipt")){
        
            cs=conn.prepareCall("call new_receipt(?,?,?,?,?,?,?,?)");
            //int bid=1;//get value from session
            cs.setInt(1,bid);
            cs.setString(2,request.getParameter("tid"));
            cs.setString(3,request.getParameter("name").trim());
            cs.setString(4,request.getParameter("date"));
            cs.setString(5,request.getParameter("amount"));
            cs.setString(6,request.getParameter("description").trim());
            cs.setString(7,userName);//get value from session
            cs.setString(8,request.getParameter("mode").trim());
//            System.out.println(request.getParameter("description").trim());
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
        } else if(type.equalsIgnoreCase("deleteReceipt")){
        
            cs=conn.prepareCall("call delete_receipt(?,?)");
            cs.setString(1,request.getParameter("tid"));
            cs.setString(2,request.getParameter("id"));
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
        }else if(type.equalsIgnoreCase("editReceipt")){
        
            cs=conn.prepareCall("call edit_receipt(?,?,?,?,?,?,?,?,?)");
           // int bid=1;//get value from session
            cs.setInt(1,bid);
            cs.setString(2,request.getParameter("tid"));
            cs.setString(3,request.getParameter("name").trim());
            cs.setString(4,request.getParameter("date"));
            cs.setString(5,request.getParameter("amount"));
            cs.setString(6,request.getParameter("description").trim());
            cs.setString(7,userName);//get value from session
            cs.setString(8,request.getParameter("id"));
            cs.setString(9,request.getParameter("mode"));
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
        }else if(type.equalsIgnoreCase("getInvoice")){
        
            cs=conn.prepareCall("call view_invoice(?,?,?)");
            //int bid=1;//get value from session
            cs.setString(1,request.getParameter("tid"));
            cs.setInt(2,bid);
            cs.setString(3,request.getParameter("invoiceType"));
            cs.execute();
//            System.out.println(cs.toString());
            boolean hasResults = cs.execute();
            int c=0;
            JSONArray temp;
           while (hasResults) {
                 rs = cs.getResultSet();
                 c++;
                 if(c==1){
                     temp=new JSONArray();
                     while(rs.next()){
                     jSONObject=new JSONObject();
                     jSONObject.put("invoiceNumber",rs.getString("invoice_num"));
                     jSONObject.put("invoiceDate",rs.getString("invoice_date"));
                     jSONObject.put("branchName",rs.getString("branch_name"));
                     jSONObject.put("customerName",rs.getString("customer_name"));
                     jSONObject.put("treatmentName",rs.getString("treatment_name"));
                     jSONObject.put("doctorName",rs.getString("doctor_name"));
                     jSONObject.put("patientName",rs.getString("patient_name"));
                     jSONObject.put("cfc",rs.getString("cfc"));
                     jSONObject.put("age",rs.getString("age"));
                     jSONObject.put("gender",rs.getString("gender"));
                     temp.put(jSONObject);
                 }
                     jSONArray.put(temp);
                 }  
                 else if(c==2){
                     temp=new JSONArray();
                while(rs.next()){
            
                    jSONObject = new JSONObject();
                    jSONObject.put("procedureName", rs.getString("procedure_name"));
                    jSONObject.put("amount", rs.getString("amount"));
                    temp.put(jSONObject);
                 }
                     jSONArray.put(temp);
                }else if(c==3){
                    temp=new JSONArray();
                while(rs.next()){
                    
                    jSONObject = new JSONObject();
                    jSONObject.put("procedureName", rs.getString("procedure_name"));
                    jSONObject.put("amount", rs.getString("amount"));
                    jSONObject.put("discount", rs.getString("discount"));
                    jSONObject.put("netAmount", rs.getString("net_amount"));
                    jSONObject.put("date", rs.getString("fstart_date"));
                    temp.put(jSONObject);
                 }
                     jSONArray.put(temp);
                }else if(c==4){
                    temp=new JSONArray();
                while(rs.next()){
            
                    jSONObject = new JSONObject();
                    jSONObject.put("itemName", rs.getString("item_name"));
                    jSONObject.put("date", rs.getString("fstart_date"));
                    jSONObject.put("amount", rs.getString("amount"));
                    jSONObject.put("quantity", rs.getString("quantity"));
                    jSONObject.put("discount", rs.getString("discount"));
                    jSONObject.put("netAmount", rs.getString("net_amount"));
                    
                    
                    temp.put(jSONObject);
            }
                jSONArray.put(temp);
                }else if(c==5){
                    temp=new JSONArray();
                while(rs.next()){
                    
                    jSONObject = new JSONObject();
                    jSONObject.put("lihName", rs.getString("lih_name"));
                    jSONObject.put("amount", rs.getString("amount"));
                    jSONObject.put("discount", rs.getString("discount"));
                    jSONObject.put("netAmount", rs.getString("net_amount"));
                    jSONObject.put("date", rs.getString("fstart_date"));
                    temp.put(jSONObject);
                 }
                     jSONArray.put(temp);
                }
            System.out.println(c+"---------"+jSONArray.toString());     
                hasResults = cs.getMoreResults();
            }
            cs.close();
        }else if(type.equalsIgnoreCase("getInvoicePrint")){
        
            cs=conn.prepareCall("call view_invoice_print(?)");
            //int bid=1;//get value from session
            cs.setString(1,request.getParameter("tid"));
            System.out.println(cs.toString());
            cs.execute();
            boolean hasResults = cs.execute();
            int c=0;
            JSONArray temp;
           while (hasResults) {
                 rs = cs.getResultSet();
                 c++;
            if(c==1){
                    temp=new JSONArray();
                while(rs.next()){
                    
                    jSONObject = new JSONObject();
                    jSONObject.put("procedureName", rs.getString("procedure_name"));
                    jSONObject.put("procedureId", rs.getString("procedure_id"));
                    jSONObject.put("amount", rs.getString("amount"));
                    jSONObject.put("discount", rs.getString("discount"));
                    jSONObject.put("netAmount", rs.getString("net_amount"));
                    jSONObject.put("date", rs.getString("fstart_date"));
                    temp.put(jSONObject);
                 }
                     jSONArray.put(temp);
                }else if(c==2){
                    temp=new JSONArray();
                while(rs.next()){
            
                    jSONObject = new JSONObject();
                    jSONObject.put("itemName", rs.getString("item_name"));
                    jSONObject.put("itemId", rs.getString("item_id"));
                    jSONObject.put("date", rs.getString("fstart_date"));
                    jSONObject.put("amount", rs.getString("amount"));
                    jSONObject.put("quantity", rs.getString("quantity"));
                    jSONObject.put("discount", rs.getString("discount"));
                    jSONObject.put("netAmount", rs.getString("net_amount"));
                    
                    
                    temp.put(jSONObject);
            }
                jSONArray.put(temp);
                }else if(c==3){
                    temp=new JSONArray();
                while(rs.next()){
                    
                    jSONObject = new JSONObject();
                    jSONObject.put("lihName", rs.getString("lih_name"));
                    jSONObject.put("lihId", rs.getString("lab_investigation_id"));
                    jSONObject.put("amount", rs.getString("amount"));
                    jSONObject.put("discount", rs.getString("discount"));
                    jSONObject.put("netAmount", rs.getString("net_amount"));
                    jSONObject.put("date", rs.getString("fstart_date"));
                    temp.put(jSONObject);
                 }
                     jSONArray.put(temp);
                }
            //System.out.println(c+"---------"+jSONArray.toString());     
                hasResults = cs.getMoreResults();
            }
            cs.close();
        }

           
            conn.commit();
            conn.close();
//            jSONObject=new JSONObject();
//            jSONObject.put("status", "1");
//            jSONArray.put(jSONObject);
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
    
        } catch (SQLException |ClassNotFoundException| JSONException ex) {
                Logger.getLogger(stPayment.class.getName()).log(Level.SEVERE, null, ex);
                response.setContentType("application/json");
                response.getWriter().write("[{\"status\":\"0\",\"errorMessage\":\" " + ex.toString() + " \"}]");
            }
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
