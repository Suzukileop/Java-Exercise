package VariablesOperateurs;

public class EchangeVariable {
    public static void main(String[] args) {
        // declaration et initialisation de deux variables 
        int a = 2;
        int b = 4;
        // int temp;

        System.out.println("Valeur initiale de a = " + a);
        System.out.println("Valeur initiale de b = " + b);

        // // Echange avec variable temporaire
        // temp = b;
        // b = a;
        // a = temp;

        System.out.println("Echange de variabe entre a et b : ");
        // System.out.println("La nouvelle valeur de a est " + a);
        // System.out.println("La nouvelle valeur de b est " + b);

        // sans variable temporaire
        a = a + b;
        b = a - b;
        a = a - b;

        System.out.println("La nouvelle valeur de a est " + a);
        System.out.println("La nouvelle valeur de b est " + b);

        

    }
    
}
