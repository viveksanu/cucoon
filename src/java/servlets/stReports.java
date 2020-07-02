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
public class stReports extends HttpServlet {


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
            validUsers.addAll(Arrays.asList(0,1,2,3));

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
	
             if(type.equalsIgnoreCase("getCashReport")){
            cs=conn.prepareCall("call get_report1(1,?,?,?)");
            cs.setString(1,request.getParameter("fromDate"));
            cs.setString(2,request.getParameter("toDate"));
            cs.setString(3,request.getParameter("branch"));
            rs=cs.executeQuery();
//System.out.println(cs.toString());
 
            boolean hasResults = cs.execute();
            int c=0;
            double rcount=0,totalAmount=0;
           while (hasResults) {
                 rs = cs.getResultSet();
                 c++;
                 if(c==1){
                     JSONArray temp=new JSONArray();
                     
                     while(rs.next()){
                     jSONObject=new JSONObject();
                     jSONObject.put("amount",rs.getString("total"));
                     jSONObject.put("count",rs.getString("count"));
                     jSONObject.put("branchName",rs.getString("branch_name"));
                     jSONObject.put("cash",rs.getString("cash"));
                     jSONObject.put("cheque",rs.getString("cheque"));
                     jSONObject.put("card",rs.getString("card"));
                     jSONObject.put("online",rs.getString("online"));
                     rcount+=Double.parseDouble(rs.getString("count"));
                     totalAmount+=Double.parseDouble(rs.getString("total"));
                     temp.put(jSONObject);
                 }
                     jSONArray.put(temp);
                 }  
                 else if(c==2){
                     JSONArray temp=new JSONArray();
                while(rs.next()){
            
                    jSONObject = new JSONObject();
                    jSONObject.put("receiptNumber", rs.getString("receipt_num"));
                    jSONObject.put("patientName", rs.getString("name"));
                    jSONObject.put("date", rs.getString("fdate"));
                    jSONObject.put("amount", rs.getString("amount"));
                    jSONObject.put("branchName", rs.getString("branch_name"));
                    temp.put(jSONObject);
            }
                jSONArray.put(temp);
                }
            //System.out.println(jSONArray.toString());     
                hasResults = cs.getMoreResults();
            }
//           JSONArray temp=new JSONArray();
                    jSONObject = new JSONObject();
                    jSONObject.put("totalInvoice", rcount);
                    jSONObject.put("totalAmount",totalAmount);
                    jSONArray.put(jSONObject);
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getOpdReport")){
            cs=conn.prepareCall("call get_report1(2,?,?,?)");
            cs.setString(1,request.getParameter("fromDate"));
            cs.setString(2,request.getParameter("toDate"));
            cs.setString(3,request.getParameter("branch"));
            rs=cs.executeQuery();
//System.out.println(cs.toString());
 
            boolean hasResults = cs.execute();
            int c=0;
            int noshow=0,neww=0,old=0;
           while (hasResults) {
                 rs = cs.getResultSet();
                 c++;
                 if(c==1){
                     JSONArray temp=new JSONArray();
                     
                     while(rs.next()){
                     jSONObject=new JSONObject();
                     jSONObject.put("noshow",rs.getString("noshow"));
                     jSONObject.put("new",rs.getString("new"));
                     jSONObject.put("old",rs.getString("old"));
                     jSONObject.put("branchName",rs.getString("name"));
                     noshow+=Integer.parseInt(rs.getString("noshow"));
                     neww+=Integer.parseInt(rs.getString("new"));
                     old+=Integer.parseInt(rs.getString("old"));
                     temp.put(jSONObject);
                 }
                     jSONArray.put(temp);
                 }  
                 else if(c==2){
                     JSONArray temp=new JSONArray();
                while(rs.next()){
            
                    jSONObject = new JSONObject();
                    jSONObject.put("cfc", rs.getString("cfc"));
                    jSONObject.put("name", rs.getString("name"));
                    jSONObject.put("branchName", rs.getString("branch_name"));
                    jSONObject.put("contact", rs.getString("contact"));
                    jSONObject.put("time", rs.getString("time"));
                    temp.put(jSONObject);
            }
                jSONArray.put(temp);
                }
            //System.out.println(jSONArray.toString());     
                hasResults = cs.getMoreResults();
            }
//           JSONArray temp=new JSONArray();
         jSONObject = new JSONObject();
                    jSONObject.put("noShow",noshow);
                    jSONObject.put("new",neww);  
                    jSONObject.put("old",old);  
                    jSONArray.put(jSONObject);
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getProcedureBranchReport")){
            cs=conn.prepareCall("call get_report1(3,?,?,?)");
            cs.setString(1,request.getParameter("fromDate"));
            cs.setString(2,request.getParameter("toDate"));
            cs.setString(3,request.getParameter("branch"));
            rs=cs.executeQuery();
         //   System.out.println(cs.toString());
                rs = cs.executeQuery();
           while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("name",rs.getString("procedure_name"));
            jSONObject.put("total",rs.getString("total"))   ;
            jSONObject.put("free",rs.getString("free"));
            jSONArray.put(jSONObject);
//            System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getProcedureReport")){
            cs=conn.prepareCall("call get_report1(4,?,?,?)");
            cs.setString(1,request.getParameter("fromDate"));
            cs.setString(2,request.getParameter("toDate"));
            cs.setString(3,request.getParameter("procedure"));
            rs=cs.executeQuery();
//            System.out.println(cs.toString());
                rs = cs.executeQuery();
           while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("name",rs.getString("name"));
            jSONObject.put("total",rs.getString("total"))   ;
            jSONObject.put("free",rs.getString("free"));
            jSONArray.put(jSONObject);
//            System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getStockReport")){
         cs=conn.prepareCall("call get_report1(5,?,?,?)");
            cs.setString(1,request.getParameter("fromDate"));
            cs.setString(2,request.getParameter("toDate"));
            cs.setString(3,request.getParameter("branch"));
            rs=cs.executeQuery();
//System.out.println(cs.toString());
 
            boolean hasResults = cs.execute();
            int c=0;
            int total=0,pending=0;
           while (hasResults) {
                 rs = cs.getResultSet();
                 c++;
                 if(c==1){
                     JSONArray temp=new JSONArray();
                     
                     while(rs.next()){
                     jSONObject=new JSONObject();
                     jSONObject.put("branchName",rs.getString("name"));
                     jSONObject.put("total",rs.getString("total"));
                     jSONObject.put("pending",rs.getString("pending"));
                     jSONObject.put("branchName",rs.getString("name"));
                     total+=Integer.parseInt(rs.getString("total"));
                     pending+=Integer.parseInt(rs.getString("pending"));
                     
                     temp.put(jSONObject);
                 }
                     jSONArray.put(temp);
                 }  
                 else if(c==2){
                     JSONArray temp=new JSONArray();
                while(rs.next()){
            
                    jSONObject = new JSONObject();
                    
                    jSONObject.put("referenceNumber", rs.getString("reference_no"));
                    jSONObject.put("branchName", rs.getString("branch_name"));
                    jSONObject.put("status", rs.getString("status"));
                    jSONObject.put("date", rs.getString("date"));
                    temp.put(jSONObject);
            }
                jSONArray.put(temp);
                }
            //System.out.println(jSONArray.toString());     
                hasResults = cs.getMoreResults();
            }
//           JSONArray temp=new JSONArray();
         jSONObject = new JSONObject();
                    jSONObject.put("total",total);
                    jSONObject.put("pending",pending);  
                    jSONArray.put(jSONObject);
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getInterStockReport")){
            cs=conn.prepareCall("call get_report1(6,?,?,?)");
            cs.setString(1,request.getParameter("fromDate"));
            cs.setString(2,request.getParameter("toDate"));
            cs.setString(3,"-1");
            rs=cs.executeQuery();
//            System.out.println(cs.toString());
                rs = cs.executeQuery();
           while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("referenceNumber",rs.getString("reference_no"));
            jSONObject.put("source",rs.getString("origin"))   ;
            jSONObject.put("destination",rs.getString("destination"));
            jSONObject.put("date",rs.getString("date"));
            jSONObject.put("status",rs.getString("status"));
            jSONArray.put(jSONObject);
//            System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getSourceReport")){
            cs=conn.prepareCall("call get_report1(7,?,?,?)");
            cs.setString(1,request.getParameter("fromDate"));
            cs.setString(2,request.getParameter("toDate"));
            cs.setString(3,request.getParameter("branch"));
            rs=cs.executeQuery();
//            System.out.println(cs.toString());
                rs = cs.executeQuery();
           while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("count",rs.getString("count"));
            jSONObject.put("source",rs.getString("source"))   ;
            jSONArray.put(jSONObject);
//            System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getCashReportBranch")){
            cs=conn.prepareCall("call get_report1(1,?,?,?)");
            cs.setString(1,request.getParameter("fromDate"));
            cs.setString(2,request.getParameter("toDate"));
            cs.setInt(3,bid);
            rs=cs.executeQuery();
//System.out.println(cs.toString());
 
            boolean hasResults = cs.execute();
            int c=0;
            double rcount=0,totalAmount=0;
           while (hasResults) {
                 rs = cs.getResultSet();
                 c++;
                 if(c==1){
                     JSONArray temp=new JSONArray();
                     
                     while(rs.next()){
                     jSONObject=new JSONObject();
                     jSONObject.put("amount",rs.getString("total"));
                     jSONObject.put("count",rs.getString("count"));
                     jSONObject.put("branchName",rs.getString("branch_name"));
                     jSONObject.put("cash",rs.getString("cash"));
                     jSONObject.put("cheque",rs.getString("cheque"));
                     jSONObject.put("card",rs.getString("card"));
                     jSONObject.put("online",rs.getString("online"));
                     rcount+=Double.parseDouble(rs.getString("count"));
                     totalAmount+=Double.parseDouble(rs.getString("total"));
                     temp.put(jSONObject);
                 }
                     jSONArray.put(temp);
                 }  
                 else if(c==2){
                     JSONArray temp=new JSONArray();
                while(rs.next()){
            
                    jSONObject = new JSONObject();
                    jSONObject.put("receiptNumber", rs.getString("receipt_num"));
                    jSONObject.put("treatmentId", rs.getString("treatment_id"));
                    jSONObject.put("receiptId", rs.getString("receipt_id"));
                    jSONObject.put("patientName", rs.getString("name"));
                    jSONObject.put("date", rs.getString("fdate"));
                    jSONObject.put("amount", rs.getString("amount"));
                    jSONObject.put("branchName", rs.getString("branch_name"));
                    temp.put(jSONObject);
            }
                jSONArray.put(temp);
                }
            //System.out.println(jSONArray.toString());     
                hasResults = cs.getMoreResults();
            }
//           JSONArray temp=new JSONArray();
                    jSONObject = new JSONObject();
                    jSONObject.put("totalInvoice", rcount);
                    jSONObject.put("totalAmount",totalAmount);
                    jSONArray.put(jSONObject);
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getOpdReportBranch")){
            cs=conn.prepareCall("call get_report1(2,?,?,?)");
            cs.setString(1,request.getParameter("fromDate"));
            cs.setString(2,request.getParameter("toDate"));
            cs.setInt(3,bid);
            rs=cs.executeQuery();
//System.out.println(cs.toString());
 
            boolean hasResults = cs.execute();
            int c=0;
            int noshow=0,neww=0,old=0;
           while (hasResults) {
                 rs = cs.getResultSet();
                 c++;
                 if(c==1){
                     JSONArray temp=new JSONArray();
                     
                     while(rs.next()){
                     jSONObject=new JSONObject();
                     jSONObject.put("noshow",rs.getString("noshow"));
                     jSONObject.put("new",rs.getString("new"));
                     jSONObject.put("old",rs.getString("old"));
                     jSONObject.put("branchName",rs.getString("name"));
                     noshow+=Integer.parseInt(rs.getString("noshow"));
                     neww+=Integer.parseInt(rs.getString("new"));
                     old+=Integer.parseInt(rs.getString("old"));
                     temp.put(jSONObject);
                 }
                     jSONArray.put(temp);
                 }  
                 else if(c==2){
                     JSONArray temp=new JSONArray();
                while(rs.next()){
            
                    jSONObject = new JSONObject();
                    jSONObject.put("cfc", rs.getString("cfc"));
                    jSONObject.put("name", rs.getString("name"));
                    jSONObject.put("branchName", rs.getString("branch_name"));
                    jSONObject.put("contact", rs.getString("contact"));
                    jSONObject.put("time", rs.getString("time"));
                    temp.put(jSONObject);
            }
                jSONArray.put(temp);
                }
            //System.out.println(jSONArray.toString());     
                hasResults = cs.getMoreResults();
            }
//           JSONArray temp=new JSONArray();
         jSONObject = new JSONObject();
                    jSONObject.put("noShow",noshow);
                    jSONObject.put("new",neww);  
                    jSONObject.put("old",old);  
                    jSONArray.put(jSONObject);
            rs.close();
            cs.close();
        }
         
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            
        } catch (SQLException |ClassNotFoundException| JSONException ex) {
                Logger.getLogger(stReports.class.getName()).log(Level.SEVERE, null, ex);
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
            throws ServletException, IOException {}

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

