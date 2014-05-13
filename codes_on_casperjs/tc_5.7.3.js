/* 
    Author: Arko
    Description:    This is a casperjs automated test script to Load a previous version of the selected notebook. On selecting the
                    option for 'Revert'resent on the top-left corner of the page, the respective version of the notebook gets saved
                    as the current version of that particular notebook
                    
    
*/

//Begin Tests

casper.test.begin("Revert a particular History Version", 5, function suite(test) {
	    
    var x= require('casper').selectXPath;
    var github_username = casper.cli.options.username;
    var github_password = casper.cli.options.password;
    var rcloud_url = casper.cli.options.url;
    
    casper.start(rcloud_url, function() {
		this.wait(2000);
		this.echo(this.getCurrentUrl());
        
        
    });//start ends
    
    casper.viewport(1366, 768).then(function() {
        
        console.log("Login into GitHub with supplied username and password");
        this.sendKeys('#login_field', github_username);
        this.sendKeys('#password',github_password);
        
               
    });
    
    casper.viewport(1366, 768).then(function() {
        this.click({type: 'css', path: 'html body.logged_out div.wrapper div.site div#site-container.context-loader-container div#login.auth-form form div.auth-form-body input.button'});
    });
    
    casper.wait(7000);
    
    casper.viewport(1366, 768).then(function() {
		this.test.assertExists(
			{type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul/li/span/a' },
			'the element Shareable Link exists'
			);
		this.test.assertExists(
			{type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul[2]/li[3]/a' },
			'Logout option exists'
			);
			
	});
	
	//click on the first notebook present in any of the 3 lists under Notebook div
	casper.viewport(1366, 768).then(function() {
		this.click(x('/html/body/div[3]/div/div/div[2]/div/div/div/div[2]/div/div/ul/li/ul/li/ul/li/div/span'));
		this.wait(8000);
	});
	
	//Create new R cell

	casper.viewport(1366, 768).then(function(){
		if(this.click(x('/html/body/div[3]/div/div[3]/div/div[3]/div/div/table/tbody/tr/td/span/i')))
		{
			this.echo('new cell button clicked');
		}
		else
		{
			this.echo('new cell could not be created;error');
		}
		this.wait(6000);
		});
	
	//Enter some code in newly created cell
	
	casper.viewport(1366, 768).then(function(){
		this.sendKeys('div.ace-chrome:nth-child(1) > textarea:nth-child(1)','rnorm(10)');
		this.wait(4000);
	});
	
	//Click on Run all option
	
	casper.then(function(){
		if(this.click(x('/html/body/div[2]/div/div[2]/ul/li[5]/button')))
		{
			this.echo('Run all button clicked');
		}
		else
		{
			this.echo('Run all button could not be clicked;error');
		}
		this.wait(7000);
		});
	
	
	//clicking history link for the first notebook
	casper.thenClick(x('/html/body/div[3]/div/div/div[2]/div/div/div/div[2]/div/div/ul/li/ul/li/ul/li/div/span[2]/span[2]/span[2]/span/i'),function(){
		  console.log('history icon clicked');
		  this.wait(7000);
		  this.test.assertExists(x('/html/body/div[3]/div/div/div[2]/div/div/div/div[2]/div/div/ul/li/ul/li/ul/li/ul/li/div/span'),'history links present');
	      //clicking on a history version
	      casper.then(function() {
			  this.click(x('/html/body/div[3]/div/div/div[2]/div/div/div/div[2]/div/div/ul/li/ul/li/ul/li/ul/li/div/span'),'clicked on a history link');
	          this.wait(10000);
		  });
		  casper.then(function() {
	          var temp=this.fetchText(x('/html/body/div[2]/div/div[2]/ul/li[2]/a'));
	          this.echo(temp);
	          this.test.assertEquals(temp,'Revert','history version has been loaded');
	          //reverting to the loaded history version
			  if(this.click(x('/html/body/div[2]/div/div[2]/ul/li[2]/a')))
			  {
				  this.wait(5000);
				  this.echo('reverted back to the selected history version');
			  }
			  else
			  {
				  this.echo('revert was not successful');
			  }
			  
		  });
		  
	  });
	
	  
		   
    casper.run(function() {
        test.done();
    });

});
