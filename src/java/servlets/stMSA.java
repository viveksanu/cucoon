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
public class stMSA extends HttpServlet {


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
            validUsers.addAll(Arrays.asList(0,1,4,5));

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
			
            
            if(type.equalsIgnoreCase("getMSAAllAllocation")){
            
            cs=conn.prepareCall("call get_msa_allocation(?,?)");
            cs.setString(1,request.getParameter("fromDate"));
            cs.setString(2,request.getParameter("toDate"));
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("id",rs.getString("id"));
            jSONObject.put("purchaseDate",rs.getString("purchase_date"));
            jSONObject.put("reference",rs.getString("reference_no"));
            jSONObject.put("branchName",rs.getString("name"));
            jSONObject.put("fstatus",rs.getString("fstatus"));
            jSONObject.put("status",rs.getString("status"));
            jSONObject.put("fdate",rs.getString("fdate"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("viewStockPurchase")){
            String ttype=request.getParameter("ttype");
         //   int bid=1;//get value from session
            if(ttype.equalsIgnoreCase("-1")){
            bid=-1;
            }else{
            bid=bid;//get value from session
            }
            cs=conn.prepareCall("call view_stock_purchase(?,?)");
            cs.setString(1,request.getParameter("id"));
            cs.setInt(2,bid);
 
 
            boolean hasResults = cs.execute();
            int c=0;
           while (hasResults) {
                 rs = cs.getResultSet();
                 c++;
                 if(c==1){
                     while(rs.next()){
                     jSONObject=new JSONObject();
                     jSONObject.put("purchaseDate",rs.getString("purchase_date"));
                     jSONObject.put("reference",rs.getString("reference_no"));
                     jSONObject.put("branchName",rs.getString("name"));
                     jSONObject.put("branchId",rs.getString("branch_id"));
                     jSONObject.put("comment",rs.getString("comment"));
                     jSONArray.put(jSONObject);
                 }
                 }  
                 else if(c==2){
                while(rs.next()){
            
                    jSONObject = new JSONObject();
                    jSONObject.put("msu", rs.getString("msu"));
                    jSONObject.put("itemName", rs.getString("item_name"));
                    jSONObject.put("itemId", rs.getString("item_id"));
                    jSONObject.put("batchId", rs.getString("batch_id"));
                    jSONObject.put("batchName", rs.getString("batch_name"));
                    jSONObject.put("sp", rs.getString("selling_price"));
                    jSONObject.put("cp", rs.getString("cost_price"));
                    jSONObject.put("quantity", rs.getString("quantity"));
                    jSONObject.put("expiry", rs.getString("expiry"));
                    jSONObject.put("brandId", rs.getString("brand_id"));
                    jSONObject.put("brandName", rs.getString("brand_name"));
                    
                    jSONArray.put(jSONObject);
            }
                }
            //System.out.println(jSONArray.toString());     
                hasResults = cs.getMoreResults();
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getViewStock")){
            
            cs=conn.prepareCall("call view_all_stock_details(?)");
            cs.setString(1,request.getParameter("branchId"));
            
            rs=cs.executeQuery();
            //System.out.println(cs.toString());
            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("id",rs.getString("item_id"));
            jSONObject.put("name",rs.getString("name"));
            jSONObject.put("pending",rs.getString("pending"));
            jSONObject.put("quantity",rs.getString("quantity"));

            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        } else if(type.equalsIgnoreCase("getBatchDetails")){
            
            cs=conn.prepareCall("call get_batch_basics(?)");
            cs.setString(1,request.getParameter("itemId"));
            
            rs=cs.executeQuery();
            //System.out.println(cs.toString());
            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("id",rs.getString("id"));
            jSONObject.put("name",rs.getString("name"));
            jSONObject.put("costPrice",rs.getString("cost_price"));
            jSONObject.put("sellingPrice",rs.getString("selling_price"));
            jSONObject.put("msu",rs.getString("msu"));
            jSONObject.put("expiryDate",rs.getString("expiry_date"));
            jSONObject.put("fdate",rs.getString("fdate"));
            jSONObject.put("comment",rs.getString("comment"));

            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }
         
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            
        } catch (SQLException |ClassNotFoundException| JSONException ex) {
                Logger.getLogger(stMSA.class.getName()).log(Level.SEVERE, null, ex);
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
            validUsers.addAll(Arrays.asList(0,1,4));

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
       if(type.equalsIgnoreCase("newItem")){
String date=null;
           date=request.getParameter("expiryDate");
           if(date.length()!=10){
           date=null;
           }
     int msu=1,iType;
      iType=Integer.parseInt(request.getParameter("iType"));
     if(iType==2){
     msu=Integer.parseInt(request.getParameter("msu"));
     }
     
          String cp=request.getParameter("costPrice");
     if(cp.length()==0){
     cp=null;
     }
            cs=conn.prepareCall("call new_item(?,?,?,?,?,?,?,?)");
            cs.setString(1,request.getParameter("itemName"));
            cs.setInt(2,iType);
            cs.setString(3,request.getParameter("batchName"));
            cs.setString(4,cp);
            cs.setString(5,request.getParameter("sellingPrice"));
            cs.setString(6,date);
            cs.setInt(7,msu);
            cs.setString(8,request.getParameter("comment"));
            //System.out.println(ps);
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
        }    else if(type.equalsIgnoreCase("editItem")){

            cs=conn.prepareCall("call edit_item(?,?)");
            cs.setString(1,request.getParameter("itemId"));
            cs.setString(2,request.getParameter("itemName"));
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
        } else if(type.equalsIgnoreCase("deleteItem")){

            cs=conn.prepareCall("call delete_item(?)");
            cs.setString(1,request.getParameter("id"));
            
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
        }
       
       else if(type.equalsIgnoreCase("newBatch")){
String date=null;
           date=request.getParameter("expiryDate");
           if(date.length()!=10){
           date=null;
           }
     int msu=1;
     String msuu=request.getParameter("msu");
     if(msuu!=null){
     msu=Integer.parseInt(msuu);
     }
          String cp=request.getParameter("costPrice");
     if(cp.length()==0){
     cp=null;
     }
            cs=conn.prepareCall("call new_item_batch(?,?,?,?,?,?,?)");
            cs.setString(1,request.getParameter("item"));
            cs.setString(2,request.getParameter("batchName"));
            cs.setString(3,cp);
            cs.setString(4,request.getParameter("sellingPrice"));
            cs.setString(5,date);
            cs.setInt(6,msu);
            cs.setString(7,request.getParameter("comment"));
         //   System.out.println(cs);
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
        }else if(type.equalsIgnoreCase("editBatch")){
String date=null;
           date=request.getParameter("expiryDate");
           if(date.length()!=10){
           date=null;
           }
     int msu=1;
     String msuu=request.getParameter("msu");
     if(msuu!=null){
     msu=Integer.parseInt(msuu);
     }
          String cp=request.getParameter("costPrice");
     if(cp.length()==0){
     cp=null;
     }
            cs=conn.prepareCall("call edit_item_batch(?,?,?,?,?,?,?,?)");
            cs.setString(1,request.getParameter("item"));
            cs.setString(2,request.getParameter("batchName"));
            cs.setString(3,cp);
            cs.setString(4,request.getParameter("sellingPrice"));
            cs.setString(5,date);
            cs.setInt(6,msu);
            cs.setString(7,request.getParameter("comment"));
            cs.setString(8,request.getParameter("batchId"));
         //   System.out.println(cs);
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
        }else if(type.equalsIgnoreCase("deleteBatch")){

            cs=conn.prepareCall("call delete_batch(?,?)");
            cs.setString(1,request.getParameter("itemId"));
            cs.setString(2,request.getParameter("batchId"));
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
        }
       
       else if (type.equalsIgnoreCase("newStockAllocation")){
        int purchaseId = 0;
            String items = request.getParameter("items");
            //System.out.println(items);
            JSONObject jsnObjectItem = new JSONObject(items);
            JSONArray jsonItems = jsnObjectItem.getJSONArray("item");

            String poDate = request.getParameter("purchaseDate").trim();           
            if (poDate.length() != 10) {
                poDate = null;
            }

            ps = conn.prepareStatement("insert into purchase_master values(null,?,?,0,?,?,null)",ps.RETURN_GENERATED_KEYS);
            ps.setString(1, request.getParameter("reference"));
            ps.setString(2, request.getParameter("branchId"));
            ps.setString(3, request.getParameter("comment").trim());
            ps.setString(4,poDate);
            ps.executeUpdate();
             //purchaseId = pstmt.getGeneratedKeys();
            //System.out.println("sales id" + salesId);
                //insert sales contents
           rs=ps.getGeneratedKeys();
           ps.close();
           while(rs.next()){
           purchaseId=rs.getInt(1);
           }
           rs.close();
            for (int i = 0; i < jsonItems.length(); i++) {
                //System.out.println("--------");
                JSONObject itemObj = jsonItems.getJSONObject(i);
                cs = conn.prepareCall("call purchase_content_entry(?,?,?,?)");
                cs.setInt(1, purchaseId);
                cs.setString(2, itemObj.getString("batchId"));
                cs.setString(3, itemObj.getString("qty"));
                cs.setString(4, itemObj.getString("brand"));
                cs.executeUpdate();
            }

        }else if(type.equalsIgnoreCase("deletePurchase")){

            cs=conn.prepareCall("call delete_purchase(?)");
            cs.setString(1,request.getParameter("id"));
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
        }else if (type.equalsIgnoreCase("editStockAllocation")){
        String purchaseId = request.getParameter("purchaseId");
            String items = request.getParameter("items");
            //System.out.println(items);
            JSONObject jsnObjectItem = new JSONObject(items);
            JSONArray jsonItems = jsnObjectItem.getJSONArray("item");

            String poDate = request.getParameter("purchaseDate").trim();           
            if (poDate.length() != 10) {
                poDate = null;
            }

            cs = conn.prepareCall("call edit_purchase(?,?,?,?,?)");
            cs.setString(1, request.getParameter("reference"));
            cs.setString(2, request.getParameter("branchId"));
            cs.setString(3, request.getParameter("comment").trim());
            cs.setString(4,poDate);
            cs.setString(5,purchaseId);
            cs.executeUpdate();
            cs.close();
            
            for (int i = 0; i < jsonItems.length(); i++) {
                //System.out.println("--------");
                JSONObject itemObj = jsonItems.getJSONObject(i);
                cs = conn.prepareCall("call purchase_content_entry(?,?,?,?)");
                cs.setString(1, purchaseId);
                 cs.setString(2, itemObj.getString("batchId"));
                cs.setString(3, itemObj.getString("qty"));
                cs.setString(4, itemObj.getString("brand"));
                cs.executeUpdate();
            }

        }
           
            conn.commit();
            conn.close();
            jSONObject.put("status", "1");
            jSONArray.put(jSONObject);
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
    
        } catch (SQLException |ClassNotFoundException| JSONException ex) {
                Logger.getLogger(stMSA.class.getName()).log(Level.SEVERE, null, ex);
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

