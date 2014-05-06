/* 
    Author: Arko
    Description:    This is a casperjs automated test script on Comments feature of RCloud .To write a comment for 
                    the currently loaded notebook in the comment div provided in the right-side of the page
    
*/

// Begin Tests 


casper.test.begin("tc_6.1.2", 2 , function suite(test) {
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

		//Opened Comments div
		
 casper.thenClick(x('/html/body/div[3]/div/div[4]/div/div/div[2]/div[3]/div/a/div/i'), function(){
	console.log('Comments div opened');
	this.wait(6000);
	this.sendKeys('#comment-entry-body', 'hello there');
	this.wait(6000);
	this.test.assertExists({type: 'xpath', path: '/html/body/div[3]/div/div[4]/div/div/div[2]/div[3]/div[2]/div/div/div/div[2]/textarea	' },
    'the element Comment exists');
	});
	
 casper.thenClick(x('/html/body/div[3]/div/div[4]/div/div/div[2]/div[3]/div[2]/div/div/div/div[2]/input'), function(){
    this.wait(2000);
	//this.test.assertTextExists(x('/html/body/div[3]/div/div[4]/div/div/div[2]/div[3]/div[2]/div/div/div/div/div/div[2]'),'hello there');
	var msg=casper.fetchText(x('/html/body/div[3]/div/div[4]/div/div/div[2]/div[3]/div[2]/div/div/div/div/div/div[2]'));
	this.echo(casper.fetchText(x('/html/body/div[3]/div/div[4]/div/div/div[2]/div[3]/div[2]/div/div/div/div/div/div[2]')));
	 var abc = casper.fetchText(x('/html/body/div[3]/div/div[4]/div/div/div[2]/div[3]/div/a/span'));
	 	 this.echo(abc);
	console.log('Comments entered');
	
});//ends	
		
    casper.run(function() {
        test.done();
    });
});
