
package servlets;

import java.io.IOException;
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


public class stChangePassword extends HttpServlet {

   String user=Credentials.getUSER();
String pass=Credentials.getPASS();
String forName=Credentials.getForName();
String db_url=Credentials.getDB_URL();

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    }
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
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
       try {
           //System.out.println("1");
            response.setContentType("plain/text");
            response.setCharacterEncoding("UTF-8");
            String cpass=request.getParameter("cpassword").trim();
            String npass=request.getParameter("newPassword").trim();
            String cnpass=request.getParameter("confirmPassword").trim();
            HttpSession session = request.getSession();
            String userId=session.getAttribute("userId").toString();
            //System.out.println(cpass);
            if(!npass.equals(cnpass)){
                //System.out.println("1");
                response.getWriter().write("1");
              return;   
            }
            if(npass.length()<1){
                System.out.println("1");
                response.getWriter().write("1");
              return;
            }
            Class.forName(forName);
            Connection conn = DriverManager.getConnection(db_url, user, pass);
            PreparedStatement sql=conn.prepareStatement("select password from user_master where id like ?");
            sql.setString(1,userId);
            ResultSet rs=sql.executeQuery();//System.out.println("2");
            boolean res=false;
            while(rs.next()){
                if(rs.getString("password").equals(cpass))
                    res=true;
              //  System.out.println("3");
            }
            sql.close();
            if(res){//System.out.println("4");
                sql=conn.prepareStatement("update user_master set password = ? where id like ?");
                sql.setString(1,npass);
                sql.setString(2,userId);
                int r=sql.executeUpdate();
                if(r==1){//System.out.println("5 r="+r);
                    response.getWriter().write("4");//success
                    session.setAttribute("adminlogin","true");

                }
                else{//System.out.println("6");
                    response.getWriter().write("3");//unexpected error

                }
            }
            else{//System.out.println("7");
                response.getWriter().write("2");//password mismatch
            }
            
        } catch (ClassNotFoundException ex) {
             response.getWriter().write("3");
            Logger.getLogger(stChangePassword.class.getName()).log(Level.SEVERE, null, ex);
            System.out.println(ex.toString());
        } catch (SQLException ex) {
             response.getWriter().write("3");
            Logger.getLogger(stChangePassword.class.getName()).log(Level.SEVERE, null, ex);
            System.out.println(ex.toString());
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
