/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;
import java.io.IOException;
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
public class stGetBasics extends HttpServlet {

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
            int bid,userId;

            HttpSession session=request.getSession(false);  
             int userType=(int) session.getAttribute("userType");
             userName=(String) session.getAttribute("userName");
             bid=(int) session.getAttribute("branchId");
             userId=(int) session.getAttribute("userId");
            
        if(type.equalsIgnoreCase("getClinics")){
            
                cs=conn.prepareCall(" call get_basics(1);");
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("clinicId",rs.getString("id"));
            jSONObject.put("clinicName",rs.getString("name"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getProcedureDetails")){
            
            cs=conn.prepareCall("call get_basics(2)");
            rs=cs.executeQuery();
            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("id",rs.getString("id"));
            jSONObject.put("name",rs.getString("name"));
            jSONObject.put("description",rs.getString("description"));
            jSONObject.put("cost",rs.getString("cost"));
            jSONArray.put(jSONObject);
            }
            rs.close();
            cs.close();
        } else if(type.equalsIgnoreCase("getItemDetails")){
            
             cs=conn.prepareCall("call get_basics(3)");
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("id",rs.getString("id"));
            jSONObject.put("name",rs.getString("name"));
            jSONObject.put("type",rs.getString("type"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getBatchBasic")){
            
            cs=conn.prepareCall("call get_basics(4)");
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("id",rs.getString("id"));
            jSONObject.put("itemId",rs.getString("item_id"));
            jSONObject.put("name",rs.getString("name"));
            jSONObject.put("cp",rs.getString("cost_price"));
            jSONObject.put("sp",rs.getString("selling_price"));
            jSONObject.put("msu",rs.getString("msu"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getMenubar")){
            
            cs=conn.prepareCall("call get_menu_bar(?)");
            cs.setInt(1,userType);
            rs=cs.executeQuery();
            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("id",rs.getString("id"));
            jSONObject.put("url",rs.getString("url"));
            jSONObject.put("rank",rs.getString("rank"));
            jSONObject.put("tag",rs.getString("tag"));
            jSONObject.put("home",rs.getString("home"));
            jSONArray.put(jSONObject);
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
        }else if(type.equalsIgnoreCase("getTransferItemDetails")){
           // int bid=1;//get bid from session
//            System.out.println("item");
            cs=conn.prepareCall("call get_item_batch_basic(1,?)");
            cs.setInt(1,bid);
            rs=cs.executeQuery();

            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("id",rs.getString("id"));
            
            jSONObject.put("name",rs.getString("name"));
            jSONArray.put(jSONObject);
//            System.out.println(jSONObject.toString());
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
        }else if(type.equalsIgnoreCase("getClinicsAdmin")){
            
                cs=conn.prepareCall("call get_clinic_admin(?,?);");
                cs.setInt(1,userId);
                cs.setInt(2,bid);
            rs=cs.executeQuery();
//            System.out.println(cs.toString());
            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("clinicId",rs.getString("id"));
            jSONObject.put("clinicName",rs.getString("name"));
            jSONArray.put(jSONObject);
            //System.out.println(jSONObject.toString());
            }
            rs.close();
            cs.close();
        }else if(type.equalsIgnoreCase("getCustomerCareSource")){
            
            cs=conn.prepareCall("call get_basics(5)");
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
        }else if(type.equalsIgnoreCase("getBrandMaster")){
            
            cs=conn.prepareCall("call get_basics(6)");
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
        }else if(type.equalsIgnoreCase("getLihDetails")){
            
            cs=conn.prepareCall("call get_basics(7)");
            rs=cs.executeQuery();
            while(rs.next()){
            jSONObject=new JSONObject();
            jSONObject.put("id",rs.getString("id"));
            jSONObject.put("name",rs.getString("name"));
            jSONObject.put("description",rs.getString("description"));
            jSONObject.put("cost",rs.getString("cost"));
            jSONArray.put(jSONObject);
            }
            rs.close();
            cs.close();
        }
            //System.out.println(jSONArray.toString());
            response.setContentType("application/json");
            response.getWriter().write(jSONArray.toString());
            
        } catch (SQLException |ClassNotFoundException| JSONException ex) {
            
            Logger.getLogger(stGetBasics.class.getName()).log(Level.SEVERE, null, ex);
                response.setContentType("application/json");
            response.getWriter().write("[{\"status\":\"0\",\"errorMessage\":\" " + ex.toString() + " \"}]");
            }
    }
    
    @Override
     protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
//System.out.println("asdasd");
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
//             if(userType>1){
//                 conn.rollback();
//                 conn.close();
//             jSONObject.put("status", "0");
//             jSONObject.put("errorMessage", "Invalid Session");
//            jSONArray.put(jSONObject);
//            
//            response.setContentType("application/json");
//            response.getWriter().write(jSONArray.toString());
//            return;
//             }   
            String name,sex,ccid="1",contact,clinic,number,age,city,rawTime,time,comment,bookedBy;//ccid will be customer care id from session
      
        if(type.equalsIgnoreCase("newBrand")){
       //    int bid=1;//get value from session
         //  bookedBy="customer care @"+bid;//get value from session
           
            cs=conn.prepareCall("call brand_master(?,?,?)");
            
            cs.setString(1,"1");
            cs.setString(2,"-1");
            cs.setString(3,request.getParameter("name"));
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
        }else if(type.equalsIgnoreCase("editBrand")){
       //    int bid=1;//get value from session
         //  bookedBy="customer care @"+bid;//get value from session
           
            cs=conn.prepareCall("call brand_master(?,?,?)");
            
            cs.setString(1,"2");
            cs.setString(2,request.getParameter("id"));
            cs.setString(3,request.getParameter("name"));
//            System.out.println(cs.toString());
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
        }else if(type.equalsIgnoreCase("deleteBrand")){
       //    int bid=1;//get value from session
         //  bookedBy="customer care @"+bid;//get value from session
           
            cs=conn.prepareCall("call brand_master(?,?,?)");
            
            cs.setString(1,"3");
            cs.setString(2,request.getParameter("id"));
            cs.setString(3,"");
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
                Logger.getLogger(stCustomerCare.class.getName()).log(Level.SEVERE, null, ex);
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
