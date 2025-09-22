package VariablesOperateurs;
import java.util.Scanner;

// Conversion Celsus vers Fahrenheit
public class ConversionCelsusFahrenheit {
    public static void main(String[] args) {
        // Creation d'objet scanner 
        Scanner scanner = new Scanner(System.in);

        // Demander un nombre 
        System.out.println("Entrez un nombre : ");
        double valeur = scanner.nextDouble();

        // conversion degree celsus en Fahrenheit 
        if (valeur != 0) {
            System.out.println(valeur + (" Degree Celsus equivaut : " + ((valeur * 1.8) + 32) + " Fahrneheit."));
        } else {
            System.out.println(valeur + ( "Degree Celsus egale a 32 Degree Fahrenheit." ));
        }

        // conversion degree Fahrenheit en Celsus
        if (valeur == 32) {
            System.out.println(valeur + " Fahrneheit equivaut a 0 Degree Celsus.");
        }else{
            System.out.println(valeur + (" Fahrneheit equivaut a " + (((valeur * 10) - 320)/ 18)));
        }

        
    }
    
}
