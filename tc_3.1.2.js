
/* 
    Author: Arko
    Description:    This is a casperjs automated test script on Shareable link feature of RCloud .On clicking the "Edit Notebook" option, 
                    the respected notebook should open in the main.html page displaying only the source codes for the notebook 
    
*/

// Begin Tests 

casper.test.begin("Github Authentication Test Suite", 1 , function suite(test) {
//var x= require('casper').selectXPath;
    casper.start('http://127.0.0.1:8080/login.R', function() {
          
		casper.echo('login.R opened');
		casper.wait(8000);

		
		casper.echo(this.getCurrentUrl());

	
	});
	
	casper.then(function(test) {
	
	siteName=this.getCurrentUrl();
	this.test.assertTitle('RCloud',
        siteName + ' has the correct title');
		casper.echo(siteName);	
	});

		// Shareable link
		
		/*casper.click(x('/html/body/div[2]/div/div[2]/ul/li/span/a/i'),function(){
		this.getCurrentUrl();
		
		});
	*/	
		casper.then(function(test){
    casper.click({type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul/li/span/a/i' },'Shareable-Link button Clicked');
	this.getCurrentUrl();
	
	});
	
	casper.then(function(test){
	casper.click({type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul/li/button'},'Edit button Clicked');
	this.getCurrentUrl();
	});
	
	
	/*casper.then(function(){
	this.thenClick({type: 'css', path: 'html body div.navbar div div.nav-collapse ul.nav li span a#share-link.btn i.icon-share'});
		this.getCurrentUrl();
		casper.capture('kunaltest.png');
		});*/

    casper.run(function() {
        test.done();
    });
});
