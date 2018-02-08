package com.ciyou.edu.service

import com.ciyou.edu.entity.Admin
import com.github.pagehelper.Page

/**
 * @Author C.
 * @Date 2018-02-02 20:39
 */
interface AdminService {

    int addAdmin(Admin admin)

    Admin findAdminById(Integer adminId)

    Admin findByAdminName(String adminName)

    /**
     * 分页查询
     * @param pageNo 页号
     * @param pageSize 每页显示记录数
     * @return
     */
    Page<Admin> findByPage(int pageNo, int pageSize)
}
