package com.mzj.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.Alias;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Alias("Game")
public class Game {
    String gid;
    String name;
    String code;
    String url;
    Integer players;
    String price;
}
