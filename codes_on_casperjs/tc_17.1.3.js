/* 
    Author: Arko
    Description:    This is a casperjs automated test script for showning that For the "Search" option, the text entered in the text box for 
                   'full-text search' will consist of combination of both Lowercase and Uppercase Letters like rnORm, PrInT etc. only
                    
    
*/

//Begin Tests

casper.test.begin("  Both Lowercase and Uppercase letters -Ex: rnORm", 3, function suite(test) {
	    
    var x= require('casper').selectXPath;
    var github_username = casper.cli.options.username;
    var github_password = casper.cli.options.password;
    var rcloud_url = casper.cli.options.url;
    var item = casper.cli.options.code;
    var title;
    var combo;	
    
    casper.start(rcloud_url, function() {  
    });
	
	casper.wait(10000);
	
	casper.viewport(1366,768).then(function() {
    if (casper.getTitle().match(/GitHub/))
	{
	
    casper.viewport(1366,768).then(function() {
       test.assertTitleMatch(/GitHub/, "Github page has been loaded"); 
       console.log("Login into GitHub with supplied username and password");
        this.sendKeys('#login_field', github_username);
        this.sendKeys('#password', github_password); 
        this.click({type: 'css', path: '#login > form > div.auth-form-body > input.button'});
    });
    
    casper.viewport(1366,768).then(function() {
        if (this.getTitle().match(/GitHub/)) 
        {
        
	   this.click({type: 'css', path: 'html body.logged_in div.wrapper div.site div#site-container.context-loader-container div.setup-wrapper div.setup-main form p button.button'}); 
	 	console.log("Github Authorization completed");
            
        }
        else
            
        {
            casper.viewport(1366,768).then(function() {
               //test.assertTitleMatch(/RCloud/, 'Rcloud Home page loaded');
			   this.echo(this.getTitle());
			   console.log("Rcloud Home page loaded");
            });
        }
	});
	
	}
	else
	{
            casper.viewport(1366,768).then(function() {
               test.assertTitleMatch(/RCloud/, 'Rcloud Home page already loaded');
            });
    }
});
    
    casper.wait(7000);
    
    casper.viewport(1366,768).then(function() {
		this.test.assertExists(
			{type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul/li/span/a' },
			'the element Shareable Link exists'
			);
		this.test.assertExists(
			{type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul[2]/li[3]/a' },
			'Logout option exists'
			);
			
	});
	
	
	//var title = casper.fetchText(x('/html/body/div[2]/div/div[2]/ul/li[6]/a/span'));
		
	casper.then(function() {
		var title = this.fetchText(x('/html/body/div[2]/div/div[2]/ul/li[6]/a/span'));
		this.wait(3000);
		this.echo('Notebook title: '+ title);
		combo = github_username + ' / ' + title;
		
	});
	
	//checking if notebook is div is open
	casper.viewport(1366,768).then(function() {
		console.log('the notebook div should be open in order to create a new notebook');
		if(this.visible('#editor-book-tree'))
		{
			console.log('Notebook div is already open');
			
		}
		else
		{
			console.log('Notebook div is closed, hence opening it');
			this.click(x('/html/body/div[3]/div/div/div[2]/div/div/div/div/a/i'));
		}
		this.wait(5000);
	});
	
	
	//Creating a New notebook
	
	casper.viewport(1366,768).then(function(){
		if(this.click({type:'xpath',path:'/html/body/div[3]/div/div/div[2]/div/div/div/div/a[2]/i'}))
		{
			this.wait(7000);
			console.log('New notebook is created');
		}
		else
		{
			console.log('New notebook could not be created');
		}
	});
	
	
	
	//fetching notebook title
	casper.then(function() {
		var title = this.fetchText(x('/html/body/div[2]/div/div[2]/ul/li[6]/a/span'));
		this.wait(3000);
		this.echo('Notebook title: '+ title);
		combo = github_username + ' / ' + title;
		
	});
	
	
	//Closing Notebook div
	casper.viewport(1366,768).then(function() {
		console.log('Notebook div should be closed so that the Search results can be viewed properly');
		if(this.visible('#editor-book-tree'))
		{
			console.log('Notebook div open, hence closing it');
			this.click(x('/html/body/div[3]/div/div/div[2]/div/div/div/div/a/i'));
		}
		else
		{
			console.log('Notebook div is closed');
		}
		this.wait(5000);
	});
	
	//Added a new cell
	
	casper.viewport(1366,768).then(function() {
		if(this.click({type:'xpath', path: '/html/body/div[3]/div/div[3]/div/div[3]/div/div/table/tbody/tr/td/span/i'}))
		{
		
			console.log('Added a new R cell');
			this.wait(5000);
		}
		else
		{
			console.log('Could not add R cell');
		}
	});
	
	//Add contents to this cell and then execute it using run option
	
	casper.viewport(1366,768).then(function(){
		this.sendKeys('div.ace-chrome:nth-child(1) > textarea:nth-child(1)',item);
		this.wait(5000);
		if(this.thenClick({type:'xpath', path: '/html/body/div[3]/div/div[3]/div/div/div/div/div/table/td/span/i'}))
		{
			this.wait(5000);
			console.log('Executed the contents of the cell');
		}
		else
		{
			console.log('Contents of the cell not executed');	
		}
	});
	
	//checking if Search div is open
	casper.viewport(1366,768).then(function() {
		if(this.visible('#search-form'))
		{
			console.log('Search div is already opened');
		}
		else
		{
			console.log('Search div is not open, hence opening it');
			if(this.click(x('/html/body/div[3]/div/div/div[2]/div/div/div[2]/div/a/i')))
			{
				this.wait(5000);
				console.log('Opened the search div');
			}
			else
			{
				console.log('could not open search div');
			}
		}
	
   });
   
   //entering item to be searched
   casper.viewport(1366,768).then(function() {
	   this.sendKeys('#input-text-search',item);
	   this.wait(6000);
   });
   
   //clicking on Search option
   casper.viewport(1366,768).then(function() {
	   if(this.click(x('/html/body/div[3]/div/div/div[2]/div/div/div[2]/div[2]/div/div/div/form/button')))
	   {
		   console.log('Search option clicked');
	   }
	   else
	   {
		   console.log('Search option could not be clicked');
	   }
   });
   
   var counter = 0;
   casper.wait(5000);
   //counting number of Search results
   casper.then(function() {
				
		do
		{
				counter=counter+1;
				this.wait(2000);
		}while(this.visible(x('/html/body/div[3]/div/div/div[2]/div/div/div[2]/div[2]/div/div/div[2]/div/div/table['+counter+']/tbody/tr/td/a')));
		
		counter=counter-1;	
		this.echo("number of search results:");
		this.echo(counter);
		
	});
   
   //verify that the searched item is found in the local user's div
   casper.viewport(1366,768).then(function() {
	   //this.echo(combo);
	   for (var i = 1; i <= counter; i++) {
		   this.wait(5000);
		   var result = this.fetchText(x('/html/body/div[3]/div/div/div[2]/div/div/div[2]/div[2]/div/div/div[2]/div/div/table['+i+']/tbody/tr/td/a'));
		   //this.echo(result);
		   if(result == combo)
		   {
			   var temp = this.fetchText(x('/html/body/div[3]/div/div/div[2]/div/div/div[2]/div[2]/div/div/div[2]/div/div/table['+i+']/tbody/tr[2]/td/div/table/tbody/tr[2]/td/table/tbody/tr/td[2]/code/b'));
	           //this.echo(temp);
	           //this.test.assertEquals(temp,item,'Searched item has been found');
	           if(temp == item)
	           {
				   console.log('searched item has been found');
			   }//inner if closes
			   else
			   {
				   console.log('searched item not found');
			   }
		   }//if closes
	   }//for closes
		   	    
	});//function closes
   
    casper.run(function() {
        test.done();
    });
});
