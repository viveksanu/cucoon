
package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author vivek
 */
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

public class stBSA extends HttpServlet {


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
            validUsers.addAll(Arrays.asList(5,2,0,1));

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

            if(type.equalsIgnoreCase("getPendingAllocation")){
            //int bid=1;//ge value from session
            cs=conn.prepareCall("call get_bsa_allocation(?)");
            cs.setInt(1,bid);
            rs=cs.executeQuery();
            //System.out.println(cs.toString());
            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("id",rs.getString("id"));
            jSONObject.put("purchaseDate",rs.getString("purchase_date"));
            jSONObject.put("reference",rs.getString("reference_no"));
            jSONObject.put("branchName",rs.getString("name"));
            jSONObject.put("fstatus",rs.getString("fstatus"));
            jSONObject.put("status",rs.getString("status"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("bsaViewStock")){
            
            //nt bid=1;//get value from session
            
            cs=conn.prepareCall("call view_all_stock_details(?)");
            cs.setInt(1,bid);
            
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
        }else if(type.equalsIgnoreCase("bsaViewBatch")){
            
            //int bid=1;//get value from session
            
            cs=conn.prepareCall("call view_stock_batch(?,?)");
            cs.setInt(1,bid);
            cs.setString(2,request.getParameter("itemId"));//get value from session
            rs=cs.executeQuery();
            //System.out.println(cs.toString());
            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("id",rs.getString("batch_id"));
            jSONObject.put("name",rs.getString("name"));
            jSONObject.put("sp",rs.getString("sp"));
            jSONObject.put("msu",rs.getString("msu"));
            jSONObject.put("comment",rs.getString("comment"));
            jSONObject.put("expiryDate",rs.getString("expiry_date"));
                jSONObject.put("quantity",rs.getString("quantity"));

            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getStockTransferAll")){
            
            cs=conn.prepareCall("call get_bsa_stock_transfer_all(?,?,?)");
            cs.setString(1,request.getParameter("fromDate"));
            cs.setString(2,request.getParameter("toDate"));
            cs.setInt(3,bid);
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("id",rs.getString("id"));
            jSONObject.put("purchaseDate",rs.getString("purchase_date"));
            jSONObject.put("reference",rs.getString("reference_no"));
            jSONObject.put("branchName",rs.getString("name"));
            jSONObject.put("fstatus",rs.getString("fstatus"));
            jSONObject.put("status",rs.getString("status"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("viewStockTransferPending")){
            
            cs=conn.prepareCall("call view_stock_transfer_pending(?,?)");
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
                    
                    jSONObject.put("itemName", rs.getString("item_name"));
                    jSONObject.put("itemId", rs.getString("item_id"));
                    jSONObject.put("batchId", rs.getString("batch_id"));
                    jSONObject.put("batchName", rs.getString("batch_name"));
                    jSONObject.put("bottle", rs.getString("bottle"));
                    jSONObject.put("quantity", rs.getString("quantity"));
                    jSONArray.put(jSONObject);
            }
                }
            //System.out.println(jSONArray.toString());     
                hasResults = cs.getMoreResults();
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("viewStockTransfer")){
            
            cs=conn.prepareCall("call view_stock_transfer(?,?)");
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
                    
                    jSONObject.put("itemName", rs.getString("item_name"));
                    jSONObject.put("itemId", rs.getString("item_id"));
                    jSONObject.put("batchId", rs.getString("batch_id"));
                    jSONObject.put("batchName", rs.getString("batch_name"));
                    jSONObject.put("bottle", rs.getString("bottle"));
                    jSONObject.put("quantity", rs.getString("quantity"));
                    jSONArray.put(jSONObject);
            }
                }
            //System.out.println(jSONArray.toString());     
                hasResults = cs.getMoreResults();
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("deleteStockTransfer")){

            cs=conn.prepareCall("call delete_stock_transfer(?,?)");
            cs.setString(1,request.getParameter("id"));
            cs.setInt(2,bid);
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
        }else if(type.equalsIgnoreCase("getBsaStockTransferPendingBranch")){
            //int bid=1;//ge value from session
            cs=conn.prepareCall("call get_bsa_stock_transfer_pending(?)");
            cs.setInt(1,bid);
            rs=cs.executeQuery();
            //System.out.println(cs.toString());
            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("id",rs.getString("id"));
            jSONObject.put("purchaseDate",rs.getString("purchase_date"));
            jSONObject.put("reference",rs.getString("reference_no"));
            jSONObject.put("branchName",rs.getString("name"));
            jSONObject.put("fstatus",rs.getString("fstatus"));
            jSONObject.put("status",rs.getString("status"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getExpiredStock")){
            
            //nt bid=1;//get value from session
            
            cs=conn.prepareCall("call expired_products(?)");
            cs.setInt(1,bid);
            
            rs=cs.executeQuery();
            //System.out.println(cs.toString());
            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("id",rs.getString("item_id"));
            jSONObject.put("name",rs.getString("name"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }
            
            //System.out.println(jSONArray.toString());
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            
        } catch (SQLException |ClassNotFoundException| JSONException ex) {
                Logger.getLogger(stBSA.class.getName()).log(Level.SEVERE, null, ex);
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
            validUsers.addAll(Arrays.asList(5,2,0,1));

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

       if(type.equalsIgnoreCase("confirmPurchase")){
        //int bid=1;//get value from session
            cs=conn.prepareCall("call confirm_purchase_bsa(?,?)");
            cs.setString(1,request.getParameter("id"));
            cs.setInt(2,bid);
            //System.out.println(ps);
           int k= cs.executeUpdate();
//           if(k==0){
//               conn.rollback();
//                 conn.close();
//            jSONObject.put("status", "0");
//            jSONObject.put("errorMessage", "Operation failed");
//            jSONArray.put(jSONObject);
//            
//            response.setContentType("application/json");
//            response.getWriter().write(jSONArray.toString());
//            return;
//           }
            cs.close();
        }else if(type.equalsIgnoreCase("confirmBsaStockTransfer")){
        //int bid=1;//get value from session
            cs=conn.prepareCall("call confirm_bsa_stock_transfer(?,?)");
            cs.setString(1,request.getParameter("id"));
            cs.setInt(2,bid);
            System.out.println(cs);
           int k= cs.executeUpdate();
//           if(k==0){
//               conn.rollback();
//                 conn.close();
//            jSONObject.put("status", "0");
//            jSONObject.put("errorMessage", "Operation failed");
//            jSONArray.put(jSONObject);
//            
//            response.setContentType("application/json");
//            response.getWriter().write(jSONArray.toString());
//            return;
//           }
            cs.close();
        }else if (type.equalsIgnoreCase("newStockTransfer")){
        int purchaseId = 0;
            String items = request.getParameter("items");
            //System.out.println(items);
            JSONObject jsnObjectItem = new JSONObject(items);
            JSONArray jsonItems = jsnObjectItem.getJSONArray("item");

            String poDate = request.getParameter("purchaseDate").trim();           
            if (poDate.length() != 10) {
                poDate = null;
            }

            ps = conn.prepareStatement("insert into stock_transfer_master values(null,?,?,?,0,?,?)",ps.RETURN_GENERATED_KEYS);
            ps.setString(1, request.getParameter("reference"));
            ps.setInt(2,bid);
            ps.setString(3, request.getParameter("targetBranchId"));
            ps.setString(4, request.getParameter("comment").trim());
            ps.setString(5,poDate);
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
           String bottle=null;
            for (int i = 0; i < jsonItems.length(); i++) {
                //System.out.println("--------");
                
                JSONObject itemObj = jsonItems.getJSONObject(i);
                bottle=itemObj.getString("bottle");
                if(bottle.equalsIgnoreCase("NA")){
                bottle="-1";
                }
                cs = conn.prepareCall("call stock_transfer_content_entry(?,?,?,?,?)");
                cs.setInt(1, purchaseId);
                cs.setString(2, itemObj.getString("batchId"));
                cs.setString(3, bottle);
                cs.setString(4, itemObj.getString("qty"));
                cs.setInt(5, bid);
                System.out.println(cs.toString());
                cs.executeUpdate();
            }

        }else if (type.equalsIgnoreCase("editBsaStockTransfer")){
        String purchaseId = request.getParameter("purchaseId");
            String items = request.getParameter("items");
            //System.out.println(items);
            JSONObject jsnObjectItem = new JSONObject(items);
            JSONArray jsonItems = jsnObjectItem.getJSONArray("item");

            String poDate = request.getParameter("purchaseDate").trim();           
            if (poDate.length() != 10) {
                poDate = null;
            }

            cs = conn.prepareCall("call edit_stock_transfer(?,?,?,?,?,?)");
            cs.setString(1, request.getParameter("reference"));
            cs.setString(2, request.getParameter("branchId"));
            cs.setString(3, request.getParameter("comment").trim());
            cs.setString(4,poDate);
            cs.setString(5,purchaseId);
            cs.setInt(6,bid);
           //System.out.println(cs.toString()); 
            cs.executeUpdate();
            cs.close();
           
         String bottle=null;
            for (int i = 0; i < jsonItems.length(); i++) {
                //System.out.println("--------");
                
                JSONObject itemObj = jsonItems.getJSONObject(i);
                bottle=itemObj.getString("bottle");
                if(bottle.equalsIgnoreCase("NA")){
                bottle="-1";
                }
                cs = conn.prepareCall("call stock_transfer_content_entry(?,?,?,?,?)");
                cs.setString(1, purchaseId);
                cs.setString(2, itemObj.getString("batchId"));
                cs.setString(3, bottle);
                cs.setString(4, itemObj.getString("qty"));
                cs.setInt(5, bid);
//                System.out.println(cs.toString());
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
                Logger.getLogger(stBSA.class.getName()).log(Level.SEVERE, null, ex);
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
