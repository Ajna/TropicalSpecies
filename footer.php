</div>
<?php
	$numPlants = 5500;
	$numPlantsRes = mysql_query("SELECT count(*) FROM `tropicalspecies`");
	if (!$numPlantsRes) {
		$numPlantsRow = mysql_fetch_row($numPlantsRes);
		if($numPlantsRow) {
			$numPlants = $row[0];
		}
	}
echo "<p class=\"small\"><b>Last update on 29/11/11:</b> Now containing $numPlants plants.</p>\n";


?>
<p>
<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/"><img
  alt="Creative Commons License" 
  style="border-width:0; padding-left:10px; padding-right:10px; float: left"
  src="http://i.creativecommons.org/l/by-nc-sa/3.0/88x31.png" /></a>
<span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/Dataset" property="dct:title" rel="dct:type">Tropical Species Database</span> 2011 by <a xmlns:cc="http://creativecommons.org/ns#" href="http://theferns.info/" property="cc:attributionName" rel="cc:attributionURL">Ken Fern</a>, 
   web interface by 
   <a xmlns:cc="http://creativecommons.org/ns#" href="http://ajna.theferns.info/" property="cc:attributionName" rel="cc:attributionURL">Ajna Fern</a>
   with help from 
   <a xmlns:cc="http://creativecommons.org/ns#" href="http://singsurf.org/" property="cc:attributionName" rel="cc:attributionURL">Richard Morris</a>.
<br />   
   The database and code is licensed under a 
   <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/">Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License</a>.
</p>