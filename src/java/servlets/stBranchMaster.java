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
public class stBranchMaster extends HttpServlet {

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
            validUsers.addAll(Arrays.asList(0,1));

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
            
        if(type.equalsIgnoreCase("getAllBranch")){
            
                cs=conn.prepareCall("call get_all_branch_basic(?)");
                cs.setString(1,"1");
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("id",rs.getString("id"));
            jSONObject.put("name",rs.getString("name"));
            jSONObject.put("type",rs.getString("type"));
            jSONObject.put("phone",rs.getString("phone"));
            jSONObject.put("cfc",rs.getString("cfc"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getBranchInfo")){
            cs=conn.prepareCall("call get_branch_basic(?,?)");
                cs.setString(1,"1");
                cs.setString(2,request.getParameter("bid"));
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("id",rs.getString("id"));
            jSONObject.put("name",rs.getString("name"));
            jSONObject.put("type",rs.getString("type"));
            jSONObject.put("phone",rs.getString("phone"));
            jSONObject.put("address",rs.getString("address"));
            jSONObject.put("branchType",rs.getString("branch_type"));
            jSONObject.put("cfc",rs.getString("cfc"));
            jSONObject.put("counter",rs.getString("counter"));
            jSONObject.put("invoicePrefix",rs.getString("invoice_prefix"));
            jSONObject.put("invoiceCounter",rs.getString("invoice_counter"));
            jSONObject.put("receiptPrefix",rs.getString("receipt_prefix"));
            jSONObject.put("receiptCounter",rs.getString("receipt_counter"));
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
                Logger.getLogger(stBranchMaster.class.getName()).log(Level.SEVERE, null, ex);
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
        //System.out.println("sssssssssscs"+type);
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
            validUsers.addAll(Arrays.asList(0,1));

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
       if(type.equalsIgnoreCase("newBranch")){
        
            cs=conn.prepareCall("call new_branch(?,?,?,?,?,?,?,?,?,?)");
            cs.setString(1,request.getParameter("name").trim());
            cs.setString(2,request.getParameter("address").trim());
            cs.setString(3,request.getParameter("contact").trim());
            cs.setString(4,request.getParameter("cfc").trim());
            cs.setString(5,request.getParameter("cfcCounter"));
            cs.setString(6,request.getParameter("ctype"));
            cs.setString(7,request.getParameter("invoicePrefix").trim());
            cs.setString(8,request.getParameter("invoiceCounter"));
            cs.setString(9,request.getParameter("receiptPrefix").trim());
            cs.setString(10,request.getParameter("receiptCounter"));
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
        }else if(type.equalsIgnoreCase("editBranchInfo")){
        
            cs=conn.prepareCall("call edit_branch_info(?,?,?,?,?)");
            cs.setString(1,request.getParameter("name"));
            cs.setString(2,request.getParameter("address"));
            cs.setString(3,request.getParameter("contact"));
            cs.setString(4,request.getParameter("ctype"));
            cs.setString(5,request.getParameter("bid"));
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
        }else if(type.equalsIgnoreCase("editBranchCfc")){
        
            cs=conn.prepareCall("call edit_branch_prefix(?,?,?,?,?,?,?)");
            cs.setString(1,request.getParameter("cfc"));
            cs.setString(2,request.getParameter("counter"));
            cs.setString(3,request.getParameter("bid"));
            cs.setString(4,request.getParameter("invoicePrefix"));
            cs.setString(5,request.getParameter("invoiceCounter"));
            cs.setString(6,request.getParameter("receiptPrefix"));
            cs.setString(7,request.getParameter("receiptCounter"));
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
                Logger.getLogger(stBranchMaster.class.getName()).log(Level.SEVERE, null, ex);
                response.setContentType("application/json");
                response.getWriter().write("[{\"status\":\"0\",\"errorMessage\":\" " + ex.toString() + " \"}]");
            }
    }

    
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
