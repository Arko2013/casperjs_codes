/* 
    Author: Arko
    Description:    This is a casperjs automated test script for showing that After 
                    forking the notebook, if the notebook is opened in Github , it opens under the local user's repository
*/

//Begin Tests

casper.test.begin("Open Notebook In Github after Forking", 10, function suite(test) {
    
    var x= require('casper').selectXPath;
    var github_username = casper.cli.options.username;
    var github_password = casper.cli.options.password;
    var rcloud_url = casper.cli.options.url;
    var notebook_id = casper.cli.options.id;
    var local_user= casper.cli.options.name;
    
    
    casper.start(rcloud_url, function() {
        
        
    });
    
   
    casper.then(function() {
       test.assertTitleMatch(/GitHub/, "Github page has been loaded"); 
       console.log("Login into GitHub with supplied username and password");
        //test.assertTitleMatch(/login*/,'login page has the correct title');
        this.sendKeys('#login_field', github_username);
        this.sendKeys('#password', github_password); 
        this.click({type: 'css', path: '#login > form > div.auth-form-body > input.button'});
    });
    
    casper.then(function() {
        if (this.getTitle().match(/GitHub/)) 
        {
        
	   this.click({type: 'css', path: 'html body.logged_in div.wrapper div.site div#site-container.context-loader-container div.setup-wrapper div.setup-main form p button.button'}); 
	 	console.log("Github Authorization completed");
            
        }
        else
            
        {
            casper.then(function() {
               test.assertTitleMatch(/RCloud/, 'Rcloud Home page loaded');
            });
        }
	});
	
	casper.wait(7000);
    //Validation to check if RCloud main page has loaded properly. We are checking if Shareable Link is visible. Similarly other 
    //icons can also be checked
    casper.then(function() {
		this.test.assertExists(
			{type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul/li/span/a' },
			'the element Shareable Link exists'
			);
		});
    
    casper.thenOpen('http://127.0.0.1:8080/view.html?notebook='+notebook_id,function() {
		this.wait(7000);
		this.echo(this.getCurrentUrl());
	});
	
	casper.then(function() {
		this.test.assertUrlMatch(/view.html/, 'view.html page for given user loaded');
        //verify that only output div is visible and editable icon exists which proves that the notebook is currently not in Editable
        //form
        this.test.assertVisible(x('/html/body/div[3]/div/div/div/div/div[2]/div[3]/div[2]/pre[2]'),'output div visible');
        this.test.assertVisible(x('/html/body/div[2]/div/div[2]/ul/li/button'),'proves that notebook currently is uneditable');
    });
    
    casper.then(function() {
		this.click(x('/html/body/div[2]/div/div[2]/ul/li/button'),'edit button clicked');
		this.wait(7000);
	});
	
	casper.then(function() {
		this.test.assertUrlMatch(/main.html/, 'RCloud main page for given user loaded');
		this.echo(this.getCurrentUrl());
		var current_name=this.fetchText(x('/html/body/div[2]/div/div[2]/ul/li[6]/a/span'));
		//checking if notebook title is editable
		this.sendKeys('#notebook-title','AaBbCc', {keepFocus: true});
		this.sendKeys('#notebook-title', casper.page.event.key.Enter , {keepFocus: true});
		this.wait(5000);
		var new_name=this.fetchText(x('/html/body/div[2]/div/div[2]/ul/li[6]/a/span'));
		
	});
	
	//fork the notebook
	casper.then(function() {
		this.test.assertExists(x('/html/body/div[2]/div/div[2]/ul/li[2]/a'),'Fork option exists');
		this.click(x('/html/body/div[2]/div/div[2]/ul/li[2]/a'),'Fork option clicked');
		this.wait(9000);
    });
    
    
    //open the notebook in Github 
    casper.then(function() {
		this.click(x('/html/body/div[2]/div/div[2]/ul[2]/li/a/b'),'Advanced div opened');
		this.wait(6000);
		
	});
	
	casper.then(function() {
		
        this.waitForSelector({type: 'css', path: 'html body div.navbar div div.nav-collapse ul.nav li.dropdown ul.dropdown-menu li a#open-in-github'}, function() {
            console.log("Link for opening notebook in github found. Clicking on it");
            
            if (this.click(x('/html/body/div[2]/div/div[2]/ul[2]/li/ul/li/a')))
            {
                
                    this.wait(7000);
                    this.waitForPopup(/gist.github.com/, function() {
                        this.test.assertEquals(this.popups.length, 1);
                                        
                    });
            this.wait(11000); 
            
            this.withPopup(/gist.github.com/, function() {
				     this.wait(4000);
			         console.log(this.getCurrentUrl());
			         this.test.assertUrlMatch(/gist.github.com*/, 'Notebook opened in github');
			         this.wait(3000);
			         //verifying that the gist opened belongs to different user
			         var gist_owner=this.fetchText(x('/html/body/div/div[2]/div/div/div/div/h1/div/div/span/span/a'));
			         this.echo(gist_owner,'current owner of the notebook');
			         this.echo(this.fetchText(x('/html/body/div/div[2]/div/div/div/div/h1/div/div[2]/span[2]')));
			         this.echo('hence confirmed that notebook opened as gist of local user');
			                              		
		             });       

		   }//if ends
            else
            {
                console.log('Notebook could not be opened in github');
            }
        });
    });
	
	
       
    casper.run(function() {
        test.done();
    });
});

