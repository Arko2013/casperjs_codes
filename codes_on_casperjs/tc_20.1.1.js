/* 
    Author: Arko
    Description:    This is a casperjs automated test script for showning that Search results should display the Notebook Descriptions when a text
                    belonging to the Comments of the respective Notebook is searched for
                    
    
*/

//Begin Tests

casper.test.begin(" Search results should come when comments are used as Search Text", 3, function suite(test) {
	    
    var x= require('casper').selectXPath;
    var github_username = casper.cli.options.username;
    var github_password = casper.cli.options.password;
    var rcloud_url = casper.cli.options.url;
    var comment = casper.cli.options.content;
    var title;
    var combo;	
    
    casper.start(rcloud_url, function() {  
    });
	
	casper.wait(10000);
	
	casper.viewport(1024,768).then(function() {
    if (casper.getTitle().match(/GitHub/))
	{
	
    casper.viewport(1024,768).then(function() {
       test.assertTitleMatch(/GitHub/, "Github page has been loaded"); 
       console.log("Login into GitHub with supplied username and password");
        this.sendKeys('#login_field', github_username);
        this.sendKeys('#password', github_password); 
        this.click({type: 'css', path: '#login > form > div.auth-form-body > input.button'});
    });
    
    casper.viewport(1024,768).then(function() {
        if (this.getTitle().match(/GitHub/)) 
        {
        
	   this.click({type: 'css', path: 'html body.logged_in div.wrapper div.site div#site-container.context-loader-container div.setup-wrapper div.setup-main form p button.button'}); 
	 	console.log("Github Authorization completed");
            
        }
        else
            
        {
            casper.viewport(1024,768).then(function() {
               //test.assertTitleMatch(/RCloud/, 'Rcloud Home page loaded');
			   this.echo(this.getTitle());
			   console.log("Rcloud Home page loaded");
            });
        }
	});
	
	}
	else
	{
           casper.viewport(1024,768).then(function() {
               test.assertTitleMatch(/RCloud/, 'Rcloud Home page already loaded');
            });
    }
});
    
    casper.wait(7000);
    
    casper.viewport(1024,768).then(function() {
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
	
	
	
	//Closing Notebook div
	casper.viewport(1024,768).then(function() {
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
	
	
	
	//entering comments
	casper.viewport(1366,768).then(function() {
		var count=this.fetchText(x('/html/body/div[3]/div/div[4]/div/div/div[2]/div[3]/div/a/span/span'));
		this.echo('Total number of comments at this instant is :');
		this.echo(count);
		if(this.visible('#comments-wrapper'))
		{
			this.echo('Comment div is open');
			this.wait(5000);
			
		}
		else
		{
			this.echo('Comment div is not open,hence opening it');
			this.wait(5000);
			this.click(x('/html/body/div[3]/div/div[4]/div/div/div[2]/div[3]/div/a/div/i'));
			this.wait(5000);
		}
		this.sendKeys('#comment-entry-body',comment);
		this.wait(6000);
		if(this.click(x('/html/body/div[3]/div/div[4]/div/div/div[2]/div[3]/div[2]/div/div/div/div[2]/input')))
		{
			this.echo('comment entered successfully');
		}
		else
		{
			this.echo('could not enter comment');
		}
		this.wait(10000);
		casper.then(function() {
			this.echo('Total number of comments at this instant is :');
			var new_count=this.fetchText(x('/html/body/div[3]/div/div[4]/div/div/div[2]/div[3]/div/a/span/span'));
			this.echo(new_count);
			
		});
		
	});
	
	//checking if Search div is open
	casper.viewport(1024,768).then(function() {
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
   casper.viewport(1024,768).then(function() {
	   this.wait(3000);
	   this.sendKeys('#input-text-search',comment);
	   this.wait(6000);
   });
   
   //clicking on Search option
   casper.viewport(1024,768).then(function() {
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
   casper.viewport(1024,768).then(function() {
	   //this.echo(combo);
	   for (var i = 1; i <= counter; i++) {
		   this.wait(5000);
		   var result = this.fetchText(x('/html/body/div[3]/div/div/div[2]/div/div/div[2]/div[2]/div/div/div[2]/div/div/table['+i+']/tbody/tr/td/a'));
		   //this.echo(result);
		   if(result == combo)
		   {
			   console.log('searched item has been found');
			   
		   }//if closes
		   else
		   {
			   console.log('Searched item not found');
		   }
	   }//for closes
		   	    
	});//function closes
   
    casper.run(function() {
        test.done();
    });
});
