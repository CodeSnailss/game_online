package com.mzj.dao;

import com.mzj.pojo.Favorite;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

public interface FavoriteMapper {
    Favorite getFavorite(@Param("uemail") String email);

    @Insert("insert into favorite (uemail,gcode) values (#{uemail},#{gcode})")
    int insert(@Param("uemail") String email, @Param("gcode") String code);

    @Delete("delete from favorite where gcode = #{gcode} and uemail = #{uemail}")
    int remove(@Param("uemail") String email, @Param("gcode") String code);

    @Select("select * from favorite where gcode = #{gcode} and uemail = #{uemail}")
    Favorite getFavorite2(@Param("uemail") String email, @Param("gcode") String code);
}
