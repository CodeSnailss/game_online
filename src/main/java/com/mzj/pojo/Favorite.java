package com.mzj.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.Alias;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Alias("Favorite")
public class Favorite {
    private String uemail;
    private List<Game> games;
}
