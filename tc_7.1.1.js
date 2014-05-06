/* 
    Author: Arko
    Description:    This is a casperjs automated test script on Open in Github feature of RCloud .The gist of notebook 
                    belonging to same user can be opened in Github by selecting the link for "open in Github" under the 
                    Advanced drop-down link present on the top-right corner of the page
    
*/

// Begin Tests 



casper.test.begin("tc_7.1.1", 1 , function suite(test) {
var x= require('casper').selectXPath;
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

		//Opened notebook in GitHub
		
	casper.then(function(){
	this.thenClick(x('/html/body/div[2]/div/div[2]/ul[2]/li/a'),function(){
	casper.thenClick(x('/html/body/div[2]/div/div[2]/ul[2]/li/ul/li/a'),'GitHub Page loaded');
	this.echo(this.getCurrentUrl());
	});
	});
	
		
    casper.run(function() {
        test.done();
    });
});
