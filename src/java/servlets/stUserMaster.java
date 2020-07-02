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
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author vivek
 */
public class stUserMaster extends HttpServlet {
String user = Credentials.getUSER();
    String pass = Credentials.getPASS();
    String forName = Credentials.getForName();
    String db_url = Credentials.getDB_URL();

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
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
            
            
        if(type.equalsIgnoreCase("getUsers")){
            
            ps=conn.prepareStatement("select user_master.*,branch_master.name branch_name,user_role.name role_name from user_master inner join user_role on user_role.role = user_master.type inner join branch_master on branch_master.id = user_master.branch_id where user_master.isactive=1 order by name");
            rs=ps.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("id",rs.getString("id"));
            jSONObject.put("username",rs.getString("name"));
            jSONObject.put("userrole",rs.getString("role_name"));
            jSONObject.put("userType",rs.getString("type"));
            jSONObject.put("branchId",rs.getString("branch_id"));
            jSONObject.put("branchName",rs.getString("branch_name"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            ps.close();
        }else if(type.equalsIgnoreCase("getUserRoles")){
            
            ps=conn.prepareStatement("select role,name from user_role");
            rs=ps.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("role",rs.getString("role"));
            jSONObject.put("name",rs.getString("name"));
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
                Logger.getLogger(stUserMaster.class.getName()).log(Level.SEVERE, null, ex);
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
            
	
       if(type.equalsIgnoreCase("newUser")){
           String userRole=request.getParameter("role");
//                       System.out.println(userRole);

            cs=conn.prepareCall("call new_user(?,?,?)");
            cs.setString(1,request.getParameter("name").trim());
            cs.setString(2,request.getParameter("role"));
            if(userRole.equalsIgnoreCase("0")||userRole.equalsIgnoreCase("1")){
            cs.setString(3,"1");
            }else{
            cs.setString(3,request.getParameter("branchId"));
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
        }else if(type.equalsIgnoreCase("deleteUser")){
        
            ps=conn.prepareStatement("update user_master set isactive=0 where id = ?");
            ps.setString(1,request.getParameter("id").trim());
            //System.out.println(ps);
           int k= ps.executeUpdate();
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
            ps.close();
        } else if(type.equalsIgnoreCase("editUser")){
        String userRole=request.getParameter("role");
            ps=conn.prepareStatement("update user_master set name = ?,type=?,branch_id=? where id=?");
            ps.setString(1,request.getParameter("name").trim());
            ps.setString(2,request.getParameter("role"));
            if(userRole.equalsIgnoreCase("0")||userRole.equalsIgnoreCase("1")){
            ps.setString(3,"1");
            }else{
            ps.setString(3,request.getParameter("branchId"));
            }
            
            ps.setString(4,request.getParameter("id"));
            //System.out.println(ps);
           int k= ps.executeUpdate();
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
            ps.close();
        }else if(type.equalsIgnoreCase("updatePassword")){
        
            ps=conn.prepareStatement("update user_master set password =? where id = ?");
            ps.setString(1,request.getParameter("password").trim());
            ps.setString(2,request.getParameter("id").trim());
            //System.out.println(ps);
           int k= ps.executeUpdate();
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
            ps.close();
        }
           
            conn.commit();
            conn.close();
            jSONObject.put("status", "1");
            jSONArray.put(jSONObject);
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
    
        } catch (SQLException |ClassNotFoundException| JSONException ex) {
                Logger.getLogger(stUserMaster.class.getName()).log(Level.SEVERE, null, ex);
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
