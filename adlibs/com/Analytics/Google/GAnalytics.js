var GAnalytics={
	
	a_centinela:false,
	
	init:function(){
		//Constructor
	},
	installUniversalAnalytics:function($propertyID){
		
	  (function(i,s,o,g,r,a,m){
	  	i['GoogleAnalyticsObject']=r;
	  	i[r]=i[r]||function(){
	  		(i[r].q=i[r].q||[]).push(arguments);
	  	},i[r].l=1*new Date();a=s.createElement(o),
	  	m=s.getElementsByTagName(o)[0];
	  	a.async=1;
	  	a.src=g;
	  	m.parentNode.insertBefore(a,m);
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	
	  ga('create', $propertyID, 'auto');
	  ga('send', 'pageview');

	},
	dispatchEvent:function($category,$action,$label,$value){
		ga('send', {
		  'hitType': 'event',          
		  'eventCategory':$category,
		  'eventAction': $action,
		  'eventLabel': $label,
		  'eventValue': $value
		});
	},
	loadEcommercePlugin:function(){
		if(GAnalytics.a_centinela==false){
			ga('require', 'ec');	
			GAnalytics.a_centinela=true;
		}
	},
	dispatcEcommerceProductImpression:function($product){
		ga('ec:addImpression', $product);
	},
	dispatchEcommerceAction:function($product,$list,$action){
		if(
		$action=='click' ||
		$action=='detail' ||
		$action=='add' ||
		$action=='remove' ||
		$action=='checkout' ||
		$action=='checkout_option' ||
		$action=='purchase' ||
		$action=='refund' ||
		$action=='promo_click'){
			ga('ec:addProduct', $product);
			ga('ec:setAction', $action, {       
			  'list': $list    
			});	
		}else{
			console.log('Error: The action does not exist, please visit: https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce?hl=es#action-types for more information. ');
		}
	},
	dispatchImpressionAndActionMerge:function($product,$list,$action){
		GAnalytics.dispatcEcommerceProductImpression($product);
		GAnalytics.dispatchEcommerceAction($product,$list,$action);
	},
	dispatchTransaction:function($product,$field){
		ga('ec:addProduct', $product);
		ga('ec:setAction', 'purchase', $field);
	},
	dispatchRefundTransaction:function($id){
		ga('ec:setAction', 'refund', {
		  'id': $id
		});
	},
	dispatchPartialRefund:function($idProduct,$quantity,$idTransaction){
		
		ga('ec:addProduct', {
		  'id': $idProduct,
		  'quantity': $quantity      
		});
		
		ga('ec:setAction', 'refund', {
		  'id': $idTransaction,      
		});
		
	},
	getActionFieldObject:function($id,$affiliation,$revenue,$tax,$shipping,$coupon,$list,$step,$option){
		return {          	
		  'id': $id,                         // (Required) Transaction id (string).
		  'affiliation': $affiliation, 		 // Affiliation (string).
		  'revenue': $revenue,               // Revenue (currency).
		  'tax': $tax,                       // Tax (currency).
		  'shipping': $shipping,             // Shipping (currency).
		  'coupon': $coupon,                  // Transaction coupon (string).
		  'list':$list,
		  'step':$step,
		  'option':$option
		};
	},
	getProductObject:function($id,$name,$category,$brand,$variant,$list,$position,$dimension1,$coupon,$quantity){
		return {            
		  'id': $id,                   	// Product ID (string).
		  'name': $name, 				// Product name (string).
		  'category': $category,   		// Product category (string).
		  'brand': $brand,              // Product brand (string).
		  'variant': $variant,          // Product variant (string).
		  'list': $list,         		// Product list (string).
		  'position': $position,        // Product position (number).
		  'dimension1': $dimension1,     // Custom dimension (string).
		  'coupon':$coupon,
		  'quantity':$quantity
		};
		
	}
};