package VariablesOperateurs;

public class Test {
    public static void main(String[] args) {
        double d1 = 0.1 + 0.2;
        double d2 = 0.3;
        
        // Arrondir à 10 décimales
        double arrondi1 = Math.round(d1 * 1e10) / 1e10;
        double arrondi2 = Math.round(d2 * 1e10) / 1e10;
        
        System.out.println("Avant arrondi: " + d1 + " == " + d2 + " ? " + (d1 == d2));
        System.out.println("Après arrondi: " + arrondi1 + " == " + arrondi2 + " ? " + (arrondi1 == arrondi2));
   
    }    
}
